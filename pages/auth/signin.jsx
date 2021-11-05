import { getCsrfToken } from "next-auth/client";
import { useRouter } from "next/router";
import Image from "next/image";

export default function SignIn({ csrfToken }) {
  const router = useRouter();

  const signUp = () => {
    router.push(`/auth/signup`);
  };

  return (
    <div className={`h-screen flex items-center justify-center m-auto`}>
      <div className="flex flex-col items-center">
        <img src="/images/bird.png" className="m-auto w-12 mb-2" />
        <h1 className="font-semibold text-2xl mb-2 m-auto">
          Log in to Chitter
        </h1>
        <form
          className={`flex flex-col pt-3 rounded`}
          method="post"
          action="/api/auth/callback/credentials"
        >
          <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
          <input
            placeholder="Username"
            name="username"
            type="text"
            className="border-2 rounded-md p-1"
          />
          <br />
          <input
            placeholder="Password"
            name="password"
            type="password"
            className="border-2 rounded-md p-1 mb-2"
          />
          <button
            type="submit"
            className="border-2 mt-3 mb-3 bg-yellow-400 p-2 rounded-full w-80 mx-auto hover:bg-yellow-500 hover:text-white"
          >
            Sign In
          </button>
        </form>
        <h1 className="text-s mt-2 mb-2 mx-auto">
          Don't have an account?{" "}
          <button
            onClick={signUp}
            className="text-yellow-500 font-bold hover:text-yellow-600"
          >
            Sign Up
          </button>
        </h1>
      </div>
    </div>
  );
}

// This is the recommended way for Next.js 9.3 or newer
export async function getServerSideProps(context) {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  };
}
