import react from "react";
import { useState } from "react";
import useSwr from "swr";
import { useSession } from "next-auth/client";
import { useRouter } from "next/router";

const TweetModal = ({ user }) => {
  const [tweet, setTweet] = useState("");
  const [session, loading] = useSession();
  const router = useRouter();

  const postTweet = async (event) => {
    if (session) {
      event.preventDefault();

      const res = await fetch("/api/tweets", {
        body: JSON.stringify(
          {
            text: tweet,
            user: user.user,
          },
          {
            withCredentials: true,
          }
        ),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });
      const result = await res.json();
    } else {
      router.push("/signup");
    }
  };

  // const { data, error } = useSwr("/api/tweets", handler);

  return (
    <div>
      {session && (
        <input
          placeholder="tweet here"
          onChange={(e) => {
            setTweet(e.target.value);
          }}
        />
      )}
      <button
        className="border-2 flex justify-center pt-3 pb-3 rounded-full bg-yellow-400 hover:bg-yellow-500 hover:text-white w-36 font-medium"
        onClick={postTweet}
      >
        Tweet
      </button>
    </div>
  );
};

export default TweetModal;
