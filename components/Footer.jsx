import Composer from "../public/assets/composer-icon.svg";

const Footer = () => {
  return (
    <div className="relative">
      {/* <div className="fill-current text-yellow-300 p-10">
        <button>
          <Composer className="w-12 fixed bottom-24 right-52 border-2 rounded-full bg-white" />
        </button>
      </div> */}
      <div className="pt-1 pb-1 fixed bottom-0 w-full flex flex-col items-center bg-yellow-400 border-t-2 border-gray-900 h-16">
        <div className="flex">
          <div className="flex flex-col mr-24">
            <h2 className="font-extrabold">Don't miss what's happening.</h2>
            <p>People on Chitter the first to know.</p>
          </div>
          <div className="flex items-center">
            <button className="border-2 flex justify-center pt-1 pb-1 mr-5 rounded-full bg-white text-yellow-400 w-24 h-10 font-bold">
              Sign Up
            </button>
            <button className="border-2 flex justify-center pt-1 pb-1 mr-5 rounded-full bg-white text-yellow-400 w-24 h-10 font-bold">
              Log In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
