import Layout from "../../components/Layout";
import { useRouter } from "next/router";
import { useSession } from "next-auth/client";
import React, { useRef, useState } from "react";

const UpdateProfile = () => {
  const url = "https://api.cloudinary.com/v1_1/dryaxqxie/image/upload";
  const preset = "chitter";
  const [session, loading] = useSession();
  const usernameRef = useRef(null);
  const fullNameRef = useRef(null);
  const bioRef = useRef(null);
  const [file, setFile] = useState("");
  const [image, setImage] = useState("");
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [bio, setBio] = useState("");

  if (session) {
    setUsername(session.user.username);
    setFullName(session.user.fullName);
    setBio(session.user.bio);
  }

  const onChange = async (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <div className="border-l-2 border-r-2 h-full max-w-screen-sm m-auto flex flex-col">
      {session && (
        <div className="w-full flex flex-col items-center border-b-2">
          <h2 className="text-xl">Hello {username}</h2>
          <div>
            <label for="bio">Full Name:</label>
            <input type="text" placeholder={fullName} ref={fullNameRef} />
          </div>
          <div>
            <label for="bio">Bio: </label>
            <input name="bio" type="text" placeholder={bio} ref={bioRef} />
          </div>
          {/* <input
            accept="image/*"
            multiple
            type="file"
            // onChange={onChange}
            required
          /> */}
          <button className="border-2 border-black">Submit</button>
        </div>
      )}
    </div>
  );
};

UpdateProfile.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default UpdateProfile;
