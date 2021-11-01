import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/client";

const Navbar = () => {
  const [session, loading] = useSession();
  return (
    <div className="flex flex-row items-center justify-between bg-black border-b-2 border-gray-900">
      <div>
        <Link href="/" passHref>
          <h2 className="text-4xl font-bold font-body ml-6 cursor-pointer pb-1">
            <span className="text-white">Chitter</span>
          </h2>
        </Link>
      </div>
      <div className="p-4 justify-self-end align-middle">
        {!session ? (
          <div>
            <Link href="/signup" passHref>
              <button className="bg-black hover:bg-gray-600 transition duration-300 text-white font-semibold py-2 px-4 hover:border-gray-400 rounded shadow">
                Sign Up
              </button>
            </Link>
            <button
              onClick={() => signIn()}
              className="bg-black hover:bg-gray-600 transition duration-300 text-white font-semibold py-2 px-4 hover:border-gray-400 rounded shadow"
            >
              Log In
            </button>
          </div>
        ) : (
          <div className="flex items-center">
            <img
              width="100px"
              src={"./bluetit.jpg"}
              className="rounded-full h-12 w-12 mr-3 hover:cursor-pointer"
            />
            {/* <p className="text-white pl-3">{session.user.name}</p> */}
            <Link href={`/profile/${session.user.username}`} passHref>
              <button className="bg-black hover:bg-gray-600 transition duration-300 text-white font-semibold py-2 px-4 hover:border-gray-400 rounded shadow">
                Profile
              </button>
            </Link>
            <button
              onClick={() =>
                signOut({
                  callbackUrl: `${window.location.origin}`,
                })
              }
              className="bg-black hover:bg-gray-600 transition duration-300 text-white font-semibold py-2 px-4 hover:border-gray-400 rounded shadow"
            >
              Sign Out
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
