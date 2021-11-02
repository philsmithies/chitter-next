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
      setLoading(true);
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
          withCredentials: true,
        }
      ).then((response) => {
        setLoading(false);
        console.log(response);
        if (response.data.success) {
          signIn();
        }
      });
    } catch (err) {
      console.error(err);
    }
    // const res = await fetch("/api/users", {
    //   method: "POST",
    //   body: JSON.stringify({
    //     email,
    //     password,
    //     username,
    //     fullName,
    //     image,
    //   }),
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // });

    // const data = await response.json();
  };

  return (
    <div
      className={`bg-gray-800 h-screen flex ${
        !loading ? "items-center" : ""
      } justify-center`}
    >
      {loading && (
        <div className="mt-36">
          <PuffLoader
            color={"#36D7B7"}
            // loading={loading}
            // css={override}
            size={100}
          />
        </div>
      )}
      {!loading && (
        <form
          className="bg-white w-3/12 flex flex-col mb-56 p-3 rounded"
          onSubmit={onFormSubmit}
        >
          <input
            className="border-2 rounded-md p-1"
            ref={emailRef}
            placeholder="email"
          />
          <br />
          <input
            className="border-2 rounded-md p-1"
            ref={usernameRef}
            placeholder="username"
          />
          <br />
          <input
            className="border-2 rounded-md p-1"
            ref={fullNameRef}
            placeholder="full name"
          />
          <br />
          <input
            className="border-2 rounded-md p-1"
            ref={passwordRef}
            placeholder="password"
          />
          <br />
          <input
            className="border-2 p-1 mb-2"
            accept="image/*"
            multiple
            type="file"
            onChange={onChange}
          />
          <button className="border-2 mt-3 bg-yellow-400 p-2">Submit</button>
        </form>
      )}
    </div>
  );
};

export default SignUp;
