"use client";
import React, { useEffect, useState, useCallback } from "react";
import Script from "next/script";
import { fetchuser, fetchpayments, initiate } from "@/actions/useractions";
import { SearchParamsContext } from "next/dist/shared/lib/hooks-client-context.shared-runtime";
import { useSearchParams } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Bounce } from "react-toastify";

const PaymentPage = ({ username }) => {
  // const { data: session } = useSession();
  const [paymentform, setPaymentform] = useState({
    name: "",
    message: "",
    amount: "",
  });
  const [currentUser, setcurrentUser] = useState({});
  const [Payments, setPayments] = useState([]);
  const searchParams = useSearchParams();

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (searchParams.get("paymentdone") == "true") {
      toast("Thanks for your donation!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  }, []);

  const handleChange = (e) => {
    setPaymentform({ ...paymentform, [e.target.name]: e.target.value });
  };

  const getData = async () => {
    let u = await fetchuser(username);
    setcurrentUser(u);
    let dbpayments = await fetchpayments(username);
    setPayments(dbpayments);
  };

  const pay = async (amount) => {
    let a = await initiate(amount, username, paymentform);
    let orderId = a.id;
    var options = {
      key: process.env.NEXT_PUBLIC_KEY_ID, // Enter the Key ID generated from the Dashboard
      amount: amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      name: "Get Me A Chai", //your business name
      description: "Test Transaction",
      image: "https://example.com/your_logo",
      order_id: orderId, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      callback_url: `${process.env.NEXT_PUBLIC_URL}/api/razorpay`,
      prefill: {
        //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
        name: "Gaurav Kumar", //your customer's name
        email: "gaurav.kumar@example.com",
        contact: "9000090000", //Provide the customer's phone number for better conversion rates
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };

    var rzp1 = new Razorpay(options);
    rzp1.open();
  };
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <ToastContainer />
      <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>
      <div className="cover relative">
        <img
          className="w-full h-48 md:h-[500px] object-cover"
          src={currentUser.coverpic}
        />
        <div className="absolute -bottom-16 md:right-[45%] right-[36%] border-2 overflow-hidden border-white rounded-full size-36">
          <img
            className="rounded-full object-cover size-36"
            width={94}
            height={94}
            src={currentUser.profilepic}
            alt=""
          />
        </div>
      </div>
      <div className="info flex flex-col justify-center items-center my-20 gap-1 mb-32">
        <div className="font-bold text-lg">@{username}</div>
        <div className="text-slate-400">Lets help {username} to get a chai</div>
        <div className="text-slate-400">
          {Payments.length} Payments . ₹
          {Payments.reduce((a, b) => a + b.amount, 0)} raised
        </div>
        <div className="payment flex flex-col md:flex-row gap-3 w-[80%] mt-11">
          <div className="supporters md:w-1/2 w-full bg-slate-800 rounded-lg text-white p-10">
            {/* show the list of all supporters as a leaderboard */}
            <h2 className="text-lg font-bold mx-3 my-3">Top 10 Supporters</h2>
            <ul className="mx-3 my-4 text-sm">
              {Payments.length == 0 && <li>No Payments yet</li>}
              {Payments.map((p, i) => {
                return (
                  <li className="mx-3 my-2 flex gap-2 items-center">
                    <img height={20} width={30} src="avatar.gif" />
                    <span>
                      {p.name} donated
                      <span className="font-bold"> ₹{p.amount}</span> with a
                      message "{p.message}"
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="Makepayments md:w-1/2 w-full bg-slate-800 rounded-lg text-white p-10">
            <h2 className="text-lg font-bold mx-3 my-3">Make a Payment</h2>
            <div className="flex flex-col gap-2">
              <input
                onChange={handleChange}
                value={paymentform.name}
                name="name"
                type="text"
                className="w-full p-3 rounded-lg bg-slate-700"
                placeholder="Enter Name"
              />

              <input
                onChange={handleChange}
                name="message"
                value={paymentform.message}
                type="text"
                className="w-full p-3 rounded-lg bg-slate-700"
                placeholder="Enter Message"
              />
              <input
                onChange={handleChange}
                value={paymentform.amount}
                type="text"
                name="amount"
                className="w-full p-3 rounded-lg bg-slate-700"
                placeholder="Enter Amount"
              />
              <button
                onClick={() => pay(Number.parseInt(paymentform.amount) * 100)}
                type="button"
                className="text-white bg-gradient-to-br from-purple-800 to-blue-800 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 disabled:bg-slate-600 disabled:from-purple-100"
                disabled={
                  paymentform.name?.length < 3 ||
                  paymentform.message?.length < 4 ||
                  paymentform.amount?.length < 1
                }>
                Pay
              </button>
            </div>
            <div className="flex flex-col md:flex-row gap-2 mt-5">
              <button
                className="bg-slate-700 rounded-lg p-3"
                onClick={() => pay(1000)}>
                Pay ₹10
              </button>
              <button
                className="bg-slate-700 rounded-lg p-3"
                onClick={() => pay(2000)}>
                Pay ₹20
              </button>
              <button
                className="bg-slate-700 rounded-lg p-3"
                onClick={() => pay(3000)}>
                Pay ₹30
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentPage;
