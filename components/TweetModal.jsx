import { useState } from "react";
import { useSession } from "next-auth/client";
import { useRouter } from "next/router";
import CloseIcon from "../public/assets/close.svg";
import Axios from "axios";

const TweetModal = ({ user }) => {
  const url = "https://api.cloudinary.com/v1_1/dryaxqxie/image/upload";
  const preset = "chitter";
  const [image, setImage] = useState("");
  const [tweet, setTweet] = useState("");
  const [modalVisibility, setModalVisibility] = useState(false);
  const [session, loading] = useSession();
  const [previewSource, setPreviewSource] = useState("");
  const router = useRouter();

  const onChange = (e) => {
    setImage(e.target.files[0]);
    const file = e.target.files[0];
    previewFile(file);
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    // reads the file as url to create preview
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  const postTweet = async (publicId) => {
    if (session) {
      event.preventDefault();

      const res = await fetch("/api/tweets", {
        body: JSON.stringify(
          {
            text: tweet,
            user: user,
            imageUrl: publicId,
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

  const checkValidation = async (e) => {
    if (!image) {
      let publicId = "";
      postTweet(publicId);
    } else {
      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", preset);
      const res = await Axios.post(url, formData);
      let publicId = res.data.secure_url;
      postTweet(publicId);
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
                <input
                  required
                  accept="image/*"
                  // className={classes.input}
                  id="contained-button-file"
                  multiple
                  type="file"
                  onChange={onChange}
                />
              </div>
              {previewSource && (
                <div className="w-24 h-24 overflow-hidden">
                  <img src={previewSource} alt="chosen" className="max-w-s" />
                </div>
              )}
              <button
                className="self-end border-2 flex justify-center items-center pt-3 pb-3 mr-4 rounded-full bg-yellow-400 hover:bg-yellow-500 hover:text-white w-24 h-10 font-medium"
                onClick={checkValidation}
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
