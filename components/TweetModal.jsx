import react from "react";
import { useState } from "react";
import useSwr from "swr";

const TweetModal = ({ user }) => {
  const [tweet, setTweet] = useState("");

  const postTweet = async (event) => {
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
    // result.user => 'Ada Lovelace'
  };

  // const { data, error } = useSwr("/api/tweets", handler);

  return (
    <div>
      {/* <input
        placeholder="tweet here"
        onChange={(e) => {
          setTweet(e.target.value);
        }}
      /> */}
      <button
        className="border-2 flex justify-center pt-3 pb-3 rounded-full bg-yellow-400 w-36 font-medium"
        onClick={postTweet}
      >
        Tweet
      </button>
    </div>
  );
};

export default TweetModal;
