import Link from "next/link";
import { FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="relative ">
      <div className="pt-2 pb-2 fixed bottom-0 w-full flex flex-col items-center bg-yellow-400 border-t-2 border-gray-900">
        <div className="flex w-5/12 justify-between">
          <div className="flex flex-col">
            <h2 className="font-extrabold">Don't miss what's happening.</h2>
            <p>People on Chitter the first to know.</p>
          </div>
          <div className="flex">
            <button className="border-2 flex justify-center pt-3 pb-3 mr-5 rounded-full bg-white text-yellow-400 w-24 font-bold">
              Sign Up
            </button>
            <button className="border-2 flex justify-center pt-3 pb-3 rounded-full bg-white text-yellow-400 w-24 font-bold">
              Log In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
