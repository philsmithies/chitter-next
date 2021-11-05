import { useState } from "react";
import { useSession } from "next-auth/client";
import { useRouter } from "next/router";
import CloseIcon from "../public/assets/close.svg";
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
      toggleModal();
      router.reload(window.location.pathname);
    } else {
      router.push("/auth/signup");
    }
  };

  const toggleModal = () => {
    if (!session) {
      router.push("/auth/signup");
    } else {
      setModalVisibility((prevModalVisibility) => !modalVisibility);
    }
  };

  return (
    <div>
      <button
        className="border-2 flex justify-center pt-3 pb-3 rounded-full bg-yellow-400 hover:bg-yellow-500 hover:text-white w-36 font-medium"
        onClick={toggleModal}
      >
        Tweet
      </button>
      {modalVisibility && (
        <div
          className={`fixed inset-0 
      bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-20`}
        >
          <div
            class={`relative top-40 mx-auto pt-5 pb-5 border w-96 shadow-lg rounded-2xl bg-white`}
          >
            <div className="border-b-2 w-95">
              <button onClick={toggleModal}>
                <CloseIcon className="w-8 ml-2 pb-1 fill-current text-yellow-400 hover:text-yellow-500" />
              </button>
            </div>
            <div class="mt-3 flex flex-col">
              <div className="border-b-2 mb-2 w-94 m-auto">
                <input
                  className="pt-2 pb-2 w-94"
                  type="text"
                  placeholder="Whats happening?"
                  required
                  onChange={(e) => {
                    setTweet(e.target.value);
                  }}
                />
              </div>
              <button
                className="self-end border-2 flex justify-center items-center pt-3 pb-3 mr-4 rounded-full bg-yellow-400 hover:bg-yellow-500 hover:text-white w-24 h-10 font-medium"
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
