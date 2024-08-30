"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Login from "@/app/login/page";
import { fetchuser, updateProfile } from "@/actions/useractions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Bounce } from "react-toastify";

const Dashboard = () => {
  const { data: session, update } = useSession();
  const router = useRouter();
  const [form, setform] = useState({});

  useEffect(() => {
    if (!session) {
      router.push("/login");
    } else {
      getData();
    }
  }, [router, session]);

  const getData = async () => {
    let u = await fetchuser(session.user.name);
    setform(u);
  };

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    let a = await updateProfile(e, session.user.name);
    toast("Profile Updated", {
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
        transition="Bounce"
      />
      <ToastContainer />
      <div className="container  md:w-1/2 mx-auto py-5 px-6 md:px-0">
        <h1 className="text-center my-5 text-2xl font-bold">
          Welcome to your Dashboard
        </h1>
        <form className="my-2" action={handleSubmit}>
          <div className="my-2">
            <label
              htmlFor="name"
              className="block mb-2 text-xs font-medium text-gray-900 dark:text-white">
              Name
            </label>
            <input
              value={form.usename ? form.name : ""}
              onChange={handleChange}
              width={80}
              type="text"
              name="name"
              id="name"
              className="block w-full p-2 rounded-lg bg-slate-700"
              placeholder="Enter Name"
            />
          </div>
          <div className="my-2">
            <label
              htmlFor="name"
              className="text-xs block mb-2 font-medium text-gray-900 dark:text-white">
              Email
            </label>
            <input
              value={form.email ? form.email : ""}
              onChange={handleChange}
              type="email"
              name="email"
              id="email"
              className="block w-full p-2 rounded-lg bg-slate-700"
              placeholder="Enter email"
            />
          </div>

          <div className="my-2">
            <label
              htmlFor="username"
              className="block mb-2 text-xs font-medium text-gray-900 dark:text-white">
              Username
            </label>
            <input
              value={form.username ? form.username : ""}
              onChange={handleChange}
              type="text"
              name="Username"
              id="username"
              className="block w-full p-2 rounded-lg bg-slate-700"
              placeholder="Enter username"
            />
          </div>

          <div className="my-2">
            <label
              htmlFor="profilepic"
              className="block mb-2 text-xs font-medium text-gray-900 dark:text-white">
              Profile Picture
            </label>
            <input
              value={form.profilepic ? form.profilepic : ""}
              onChange={handleChange}
              type="text"
              name="profilepic"
              id="profilepic"
              className="block w-full p-2 rounded-lg bg-slate-700"
              placeholder="Enter Message"
            />
          </div>

          <div className="my-2">
            <label
              htmlFor="coverpic"
              className="block mb-2 text-xs font-medium text-gray-900 dark:text-white">
              Cover picture
            </label>
            <input
              value={form.coverpic ? form.coverpic : ""}
              onChange={handleChange}
              type="text"
              name="coverpic"
              id="coverpic"
              className="block w-full p-2 rounded-lg bg-slate-700"
              placeholder="Enter Message"
            />
          </div>

          <div className="my-2">
            <label
              htmlFor="razorpayid"
              className="block mb-2 text-xs font-medium text-gray-900 dark:text-white">
              Razorpay id
            </label>
            <input
              value={form.razorpayid ? form.razorpayid : ""}
              onChange={handleChange}
              type="text"
              name="razorpayid"
              id="razorpayid"
              className="block w-full p-2 rounded-lg bg-slate-700"
              placeholder="razorpay id"
            />
          </div>

          <div className="my-2">
            <label
              htmlFor="razorpaysecret"
              className="block mb-2 text-xs font-medium text-gray-900 dark:text-white">
              Razorpay Secret
            </label>
            <input
              value={form.razorpaysecret ? form.razorpaysecret : ""}
              onChange={handleChange}
              type="text"
              name="razorpaysecret"
              id="razorpaysecret"
              className="block w-full p-2 rounded-lg bg-slate-700"
              placeholder="razorpay secret"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full mt-2 text-white bg-gradient-to-br from-purple-800 to-blue-800 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
              Save
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Dashboard;
