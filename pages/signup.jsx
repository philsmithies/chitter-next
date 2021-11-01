import { signIn } from "next-auth/client";
import React, { useRef, useState } from "react";
import Axios from "axios";

const SignUp = () => {
  const url = "https://api.cloudinary.com/v1_1/dryaxqxie/image/upload";
  const preset = "chitter";
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const usernameRef = useRef(null);
  const fullNameRef = useRef(null);
  const [file, setFile] = useState("");
  const [image, setImage] = useState("no image");

  const onChange = (e) => {
    setFile(e.target.files[0]);
  };

  const onFormSubmit = async (e) => {
    e.preventDefault();

    if (file) {
      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", preset);
      const imageRes = await Axios.post(url, formData);
      setImage(imageRes.data.secure_url);
    }

    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const username = usernameRef.current.value;
    const name = fullNameRef.current.value;

    if (!email || !email.includes("@") || !password) {
      alert("Invalid Email");
      return;
    }

    const res = await fetch("/api/users", {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
        username,
        name,
        image,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
  };

  return (
    <div className="bg-red-400 h-screen">
      <form onSubmit={onFormSubmit}>
        <input ref={emailRef} placeholder="email" />
        <br />
        <input ref={usernameRef} placeholder="username" />
        <br />
        <input ref={fullNameRef} placeholder="full name" />
        <br />
        <input ref={passwordRef} placeholder="password" />
        <br />
        <input accept="image/*" multiple type="file" onChange={onChange} />
        <button className="border-2">Submit</button>
      </form>
    </div>
  );
};

export default SignUp;
