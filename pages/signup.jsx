import { signIn } from "next-auth/client";
import React, { useRef } from "react";

const SignUp = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const onFormSubmit = async (e) => {
    e.preventDefault();
    //Getting value from useRef()
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    //Validation
    if (!email || !email.includes("@") || !password) {
      alert("Invalid details");
      return;
    }
    //POST form values
    const res = await fetch("/api/users", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    //Await for data for any desirable next steps
    const data = await res.json();
    console.log(data);
  };

  return (
    <div className="bg-red-400 h-screen">
      <form onSubmit={onFormSubmit}>
        <input ref={emailRef} placeholder="email"></input>
        <input ref={passwordRef} placeholder="password"></input>
        <button className="border-2">Submit</button>
      </form>
    </div>
  );
};

export default SignUp;
