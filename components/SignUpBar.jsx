import { useSession } from "next-auth/client";
import { useRouter } from "next/router";

const SignUpBar = () => {
  const [session, loading] = useSession();
  const router = useRouter();

  const goToProfile = () => {
    router.push(`/profile/${session.user.username}`);
  };

  return (
    <>
      <div className="flex bg-white flex-col pt-5 pl-5 pr-5 w-3/12">
        {!session ? (
          <a href="/signup">
            <div className="flex flex-col p-4 rounded-lg border-2">
              <h1 className="font-extrabold">New To Chitter?</h1>
              <p>Sign up now to get your own personalized timeline!</p>
              <button className="border-2 flex justify-center mt-3 pt-3 pb-3 rounded-full bg-yellow-400 hover:bg-yellow-500 hover:text-white w-18 font-medium">
                Sign Up
              </button>
            </div>
          </a>
        ) : (
          <div className="flex flex-col p-4 rounded-lg border-2">
            <h1 className="font-extrabold m-auto">
              Hello, {session.user.username}
            </h1>
            <button
              className="w-24 h-10 items-center border-2 flex mx-auto justify-center mt-3 pt-3 pb-3 rounded-full bg-yellow-400 hover:bg-yellow-500 hover:text-white font-medium"
              onClick={goToProfile}
            >
              Profile
            </button>
          </div>
        )}

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
