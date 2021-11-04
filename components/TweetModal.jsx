import react from "react";
import { useState } from "react";
import useSwr from "swr";
import { useSession } from "next-auth/client";
import { useRouter } from "next/router";

const TweetModal = ({ user }) => {
  const [tweet, setTweet] = useState("");
  const [modalVisibility, setModalVisibility] = useState(false);
  const [session, loading] = useSession();
  const router = useRouter();

  const postTweet = async (event) => {
    if (session) {
      event.preventDefault();

      const res = await fetch("/api/tweets", {
        body: JSON.stringify(
          {
            text: tweet,
            user: user,
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
      setModalVisibility(false);
      router.reload(window.location.pathname);
    } else {
      router.push("/signup");
    }
  };

  const openModal = () => {
    console.log("clicked");
    setModalVisibility(true);
  };

  return (
    <div>
      <button
        className="border-2 flex justify-center pt-3 pb-3 rounded-full bg-yellow-400 hover:bg-yellow-500 hover:text-white w-36 font-medium"
        onClick={openModal}
      >
        Tweet
      </button>
      {modalVisibility && (
        <div
          className={`fixed inset-0 
      bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-20`}
        >
          <div
            class={`relative top-40 mx-auto p-5 border w-96 shadow-lg rounded-xl bg-white`}
          >
            <div class="mt-3 text-center">
              <input
                type="text"
                id="tweetInput"
                name="tweet"
                placeholder="Whats happening?"
                required
                onChange={(e) => {
                  setTweet(e.target.value);
                }}
              />{" "}
              <button
                className="border-2 flex justify-center items-center pt-3 pb-3 rounded-full bg-yellow-400 hover:bg-yellow-500 hover:text-white w-20 h-10 font-medium"
                onClick={postTweet}
              >
                Tweet
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TweetModal;
