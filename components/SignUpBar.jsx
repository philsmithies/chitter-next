import { useSession } from "next-auth/client";
import { signOut } from "next-auth/client";
import { useRouter } from "next/router";
import Link from "next/link";

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
          <Link href="/auth/signup">
            <div className="flex flex-col p-4 rounded-lg border-2">
              <h1 className="font-extrabold">New To Chitter?</h1>
              <p>Sign up now to get your own personalized timeline!</p>
              <button className="border-2 flex justify-center mt-3 pt-3 pb-3 rounded-full bg-yellow-400 hover:bg-yellow-500 hover:text-white w-18 font-medium">
                Sign Up
              </button>
            </div>
          </Link>
        ) : (
          <div className="flex flex-col pl-2 pr-2 pt-4 pb-4 rounded-lg border-2">
            <div className="flex flex-col">
              <h1 className="font-extrabold m-auto">
                Hello, {session.user.username}
              </h1>
              <a href={`/profile/${session.user.username}`}>
                <img
                  width="100px"
                  src={"/images/bluetit.jpg"}
                  className="rounded-full h-12 w-12 mt-1 mx-auto hover:cursor-pointer"
                />
              </a>
            </div>
            <button
              className="w-24 h-10 items-center border-2 flex mx-auto justify-center mt-3 pt-3 pb-3 rounded-full bg-yellow-400 hover:bg-yellow-500 hover:text-white font-medium"
              onClick={goToProfile}
            >
              Profile
            </button>
            <button
              className="w-24 h-10 items-center border-2 flex mx-auto justify-center mt-3 pt-3 pb-3 rounded-full bg-yellow-400 hover:bg-yellow-500 hover:text-white font-medium"
              onClick={signOut}
            >
              Log Out
            </button>
          </div>
        )}

        <p className="mt-3 text-gray-600">
          This is a project by
          <a
            className="text-yellow-500 font-bold hover:text-yellow-900"
            href="https://www.github.com/philsmithies"
          >
            <br />
            Phil Smithies
          </a>
        </p>
      </div>
    </>
  );
};

export default SignUpBar;
