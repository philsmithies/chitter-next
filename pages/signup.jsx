import { signIn } from "next-auth/client";
import React, { useRef, useState } from "react";

const SignUp = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const usernameRef = useRef(null);
  const fullNameRef = useRef(null);

  const onFormSubmit = async (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const username = username.current.value;
    const fullName = fullName.current.value;

    if (!email || !email.includes("@") || !password) {
      alert("Invalid details");
      return;
    }

    const res = await fetch("/api/users", {
      method: "POST",
      body: JSON.stringify({ email, password, username }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    console.log(data);
  };

  return (
    <div className="bg-red-400 h-screen">
      {/* <h1>{isLogin ? "Login" : "Sign Up"}</h1> */}
      <form onSubmit={onFormSubmit}>
        <input ref={emailRef} placeholder="email" />
        <br />
        <input ref={usernameRef} placeholder="username" />
        <br />
        <input ref={fullNameRef} placeholder="full name" />
        <br />
        <input ref={passwordRef} placeholder="password" />
        <br />
        <button className="border-2">Submit</button>
      </form>
    </div>
  );
};

export default SignUp;
