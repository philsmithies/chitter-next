import { signIn } from "next-auth/client";
import React, { useRef, useState } from "react";
import Axios from "axios";
import PuffLoader from "react-spinners/PuffLoader";
import styles from "../auth.module.css";

const SignUp = () => {
  const url = "https://api.cloudinary.com/v1_1/dryaxqxie/image/upload";
  const preset = "chitter";
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

    const password = passwordRef.current.value;
    const username = usernameRef.current.value;
    const fullName = fullNameRef.current.value;

    try {
      await Axios.post(
        "/api/users",
        {
          username,
          password,
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
    <div className={`h-screen flex items-center justify-center`}>
      <div className="flex flex-col items-center">
        <img src="/images/bird.png" className="m-auto w-12 mb-2" />
        <h1 className="font-semibold text-2xl mb-2 m-auto">
          {!loading ? "Join Chitter Today." : "Loading"}
        </h1>
        {loading && (
          <div className="flex flex-col">
            <PuffLoader color={"#36D7B7"} size={100} />
          </div>
        )}
        <form
          className={`flex flex-col pt-3 rounded ${loading ? "hidden" : ""}`}
          onSubmit={onFormSubmit}
        >
          <input
            className={styles.inputField}
            ref={usernameRef}
            placeholder="Username"
          />
          <br />
          <input
            className={styles.inputField}
            ref={fullNameRef}
            placeholder="Full Name"
          />
          <br />
          <input
            type="password"
            className={styles.inputField}
            ref={passwordRef}
            placeholder="Password"
          />
          <br />
          <input
            className={styles.inputField}
            accept="image/*"
            multiple
            type="file"
            onChange={onChange}
            required
          />
          <button className={styles.signUpBtn}>Submit</button>
        </form>
        {!loading && (
          <h1 className="text-s mt-2 mb-2 mx-auto">
            Already have an account?{" "}
            <button onClick={signIn} className={styles.signInSecondary}>
              Sign In
            </button>
          </h1>
        )}
      </div>
    </div>
  );
};

export default SignUp;
