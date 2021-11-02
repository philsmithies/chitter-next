import React from "react";

const SignUpBar = () => {
  return (
    <>
      <div className="flex bg-white flex-col pt-5 pl-5 pr-5 w-2/12">
        <a href="/signup">
          <div className="flex flex-col p-4 rounded-lg border-2">
            <h1 className="font-extrabold">New To Chitter?</h1>
            <p>Sign up now to get your own personalized timeline!</p>
            <button className="border-2 flex justify-center mt-3 pt-3 pb-3 rounded-full bg-yellow-400 hover:bg-yellow-500 hover:text-white w-18 font-medium">
              Sign Up
            </button>
          </div>
        </a>
        <p className="mt-3 text-gray-600">
          This is a project by
          <a
            className="text-yellow-500 font-bold hover:text-yellow-900"
            href="https://www.github.com/philsmithies"
          >
            {" "}
            Phil Smithies
          </a>
        </p>
      </div>
    </>
  );
};

export default SignUpBar;
