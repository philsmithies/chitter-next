import Layout from "../../components/Layout";
import { useRouter } from "next/router";
import { useSession } from "next-auth/client";
import React, { useRef, useState } from "react";
import Axios from "axios";

const UpdateProfile = () => {
  const url = "https://api.cloudinary.com/v1_1/dryaxqxie/image/upload";
  const preset = "chitter";
  const [session, loading] = useSession();
  const usernameRef = useRef(null);
  const fullNameRef = useRef(null);
  const bioRef = useRef(null);
  const [file, setFile] = useState("");
  const [image, setImage] = useState("");

  const onChange = async (e) => {
    setFile(e.target.files[0]);
  };

  const onFormSubmit = async (e) => {
    e.preventDefault();

    // const formData = new FormData();
    // formData.append("file", file);
    // formData.append("upload_preset", preset);
    // const imageRes = await Axios.post(url, formData);
    // setImage(imageRes.data.secure_url);

    const bio = bioRef.current.value;
    const fullName = fullNameRef.current.value;

    try {
      await Axios.put(
        `/api/user/${session.user.username}`,
        {
          bio,
          fullName,
          // image,
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
        // setLoading(false);
        if (response.data.success) {
          console.log("Success");
        }
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="border-l-2 border-r-2 h-full max-w-screen-sm m-auto flex flex-col">
      {session && (
        <div className="flex flex-col items-center justify-center mt-10">
          <h2 className="text-2xl font-bold mb-2">Update Profile</h2>
          <form
            className={`flex flex-col pt-3 rounded ${loading ? "hidden" : ""}`}
            onSubmit={onFormSubmit}
          >
            <label for="bio">Full Name:</label>
            <input
              className="border-2 rounded-md p-1 mb-2"
              type="text"
              placeholder={session.user.fullName}
              ref={fullNameRef}
            />
            <label for="bio">Bio: </label>
            <input
              className="border-2 rounded-md p-1"
              name="bio"
              type="text"
              placeholder={
                session.user.bio ? session.user.bio : "Please Enter A Bio"
              }
              ref={bioRef}
            />
            {/* <input
            accept="image/*"
            multiple
            type="file"
            // onChange={onChange}
            required
          /> */}
            <button className="border-2 mt-3 mb-3 bg-yellow-400 p-2 rounded-full w-48 mx-auto hover:bg-yellow-500 hover:text-white">
              Submit
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

UpdateProfile.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default UpdateProfile;
