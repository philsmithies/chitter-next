import { getCsrfToken } from "next-auth/client";
import { useRouter } from "next/router";
import Image from "next/image";
import styles from "../auth.module.css";

export default function SignIn({ csrfToken }) {
  const router = useRouter();

  const signIn = () => {
    router.push(`/`);
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
            className={styles.inputField}
          />
          <br />
          <input
            placeholder="Password"
            name="password"
            type="password"
            className={styles.inputField}
          />
          <button type="submit" className={styles.signUpBtn}>
            Sign In
          </button>
        </form>
        <h1 className="text-s mt-2 mb-2 mx-auto">
          Don't have an account?{" "}
          <button onClick={signIn} className={styles.signInSecondary}>
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
