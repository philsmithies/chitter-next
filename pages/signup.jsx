import { signIn } from "next-auth/client";
import React, { useRef, useState } from "react";
import Axios from "axios";
import PuffLoader from "react-spinners/PuffLoader";

const SignUp = () => {
  const url = "https://api.cloudinary.com/v1_1/dryaxqxie/image/upload";
  const preset = "chitter";
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const usernameRef = useRef(null);
  const fullNameRef = useRef(null);
  const [file, setFile] = useState("");
  const [image, setImage] = useState("no image");
  const [loading, setLoading] = useState(false);

  const onChange = async (e) => {
    setFile(e.target.files[0]);
  };

  const onFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", preset);
    const imageRes = await Axios.post(url, formData);
    setImage(imageRes.data.secure_url);

    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const username = usernameRef.current.value;
    const fullName = fullNameRef.current.value;

    if (!email || !email.includes("@") || !password) {
      alert("Invalid Email");
      return;
    }
    try {
      await Axios.post(
        "/api/users",
        {
          email,
          password,
          username,
          fullName,
          image,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
        {
          withCredentials: true,
        }
      ).then((response) => {
        setLoading(false);
        if (response.data.success) {
          signIn();
        }
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div
      className={`h-screen flex ${
        !loading ? "items-center" : ""
      } justify-center`}
    >
      {loading && (
        <div className="mt-36">
          <PuffLoader color={"#36D7B7"} size={100} />
        </div>
      )}
      <div className="flex flex-col w-3/12">
        <h1 className="font-semibold text-3xl mb-2">Join Chitter Today.</h1>
        <form
          className={`flex flex-col pt-3 rounded ${loading ? "hidden" : ""}`}
          onSubmit={onFormSubmit}
        >
          <input
            className="border-2 rounded-md p-1"
            ref={usernameRef}
            placeholder="Username"
          />
          <br />
          <input
            className="border-2 rounded-md p-1"
            ref={fullNameRef}
            placeholder="Full Name"
          />
          <br />
          <input
            className="border-2 rounded-md p-1"
            ref={passwordRef}
            placeholder="Password"
          />
          <br />
          <input
            className="border-2 p-1 mb-2 bg-white"
            accept="image/*"
            multiple
            type="file"
            onChange={onChange}
          />
          <button className="border-2 mt-3 mb-3 bg-yellow-400 p-2 rounded-full w-80 mx-auto hover:bg-yellow-500 hover:text-white">
            Submit
          </button>
        </form>
        <h1 className="text-s mt-2 mb-2 mx-auto">
          Already have an account?{" "}
          <button
            onClick={signIn}
            className="text-yellow-500 font-bold hover:text-yellow-600"
          >
            Sign In
          </button>
        </h1>
      </div>
    </div>
  );
};

export default SignUp;
