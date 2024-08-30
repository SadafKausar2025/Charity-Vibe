import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="flex flex-col justify-center items-center text-white h-[44vh] gap-4 px-5 md:px-0 text-xs md:text-base">
        <div className="font-bold md:text-4xl flex items-center justify-center gap-4 text-2xl">
          Get Me a Chai
          <span>
            <img className="h-20" src="tea.gif" />
          </span>
        </div>
        <p className="text-center md:text-left">
          A crowdfunding platform for creaters ,Get funded by your friends ans
          followers , Start now!
        </p>
        <p className="text-center md:text-left">
          A Place where fans can buy you a chai. Unleash the power of your fans
          and get your project funded
        </p>
        <div>
          <Link href={"/login"}>
            <button
              type="button"
              className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
              Start here
            </button>
          </Link>
          <Link href={"/about"}>
            <button
              type="button"
              className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
              Read more
            </button>
          </Link>
        </div>
      </div>
      <div className="bg-white h-1 opacity-10"></div>
      <div className="text-white container mx-auto pb-32 pt-14 px-7 ">
        <h2 className="text-center p-5 mb-8 font-bold text-3xl">
          Your Fans Can Buy You a Chai
        </h2>
        <div className="flex gap-5 justify-around">
          <div className="items space-y-3 flex flex-col items-center justify-center">
            <img
              className="bg-slate-400 rounded-full p-2 text-black"
              width={88}
              src="https://media.lordicon.com/icons/wired/lineal/1846-employee-working.svg"
              alt=""
            />
            <p className="font-bold text-center">Fans wants to help</p>
            <p className="text-center text-sm">
              Fans are available to help you
            </p>
          </div>
          <div className="items space-y-3 flex flex-col items-center justify-center">
            <img
              className="bg-slate-400 rounded-full p-2 text-black"
              width={88}
              src="coin.gif"
              alt=""
            />
            <p className="font-bold text-center">Fans wants to Contributes</p>
            <p className="text-center text-sm">
              Fans are available to help you
            </p>
          </div>
          <div className="items flex flex-col items-center justify-center space-y-3 text-white">
            <img
              className="bg-slate-400 rounded-full p-2 text-black"
              width={88}
              src="https://media.lordicon.com/icons/wired/lineal/2374-crowdfunding.svg"
              alt=""
            />
            <p className="font-bold text-center">Fans want to Collaborate</p>
            <p className="text-center text-sm">
              Fans are available for you to help you
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white h-1 opacity-10"></div>

      <div className="text-white container mx-auto pb-32 bt-14">
        <h2 className="text-center p-5 mb-8 font-bold text-3xl">
          Know More about Us
        </h2>
        <div className="flex gap-5 justify-center">
          <iframe
            src="https://www.youtube.com/embed/QtaorVNAwbI?si=GDbzTMnIZeAtHvKS"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen></iframe>
        </div>
      </div>
    </>
  );
}
