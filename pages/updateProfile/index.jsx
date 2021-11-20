import Layout from "../../components/Layout";
import { useRouter } from "next/router";
import { useSession, signOut } from "next-auth/client";
import { useRef, useState } from "react";
import PuffLoader from "react-spinners/PuffLoader";
import Axios from "axios";

const UpdateProfile = () => {
  const url = "https://api.cloudinary.com/v1_1/dryaxqxie/image/upload";
  const preset = "chitter";
  const [session, sessionLoading] = useSession();
  const usernameRef = useRef(null);
  const fullNameRef = useRef(null);
  const deleteRef = useRef(null);
  const bioRef = useRef(null);
  const [file, setFile] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [bioPhotoId, setBioPhotoId] = useState("");
  const router = useRouter();
  const [error, setError] = useState("");

  const onChange = async (e) => {
    setFile(e.target.files[0]);
  };

  const finishEdit = () => {
    router.push(`/profile/${session.user.username}`);
  };

  const onFormDelete = async (e) => {
    e.preventDefault();

    if (deleteRef.current.value === session.user.username) {
      setLoading(true);
      try {
        await Axios.delete(
          `/api/user/${session.user.username}`,
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
            signOut();
            router.push(`/`);
          }
        });
      } catch (err) {
        console.error(err);
      }
    } else {
      setError("Enter your username to delete your account");
    }
  };

  const onFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", preset);
    const imageRes = await Axios.post(url, formData);
    const bioPhoto = imageRes.data.secure_url;

    const bio = bioRef ? bioRef.current.value : session.user.bio;

    const fullName = fullNameRef
      ? fullNameRef.current.value
      : session.user.fullName;

    try {
      await Axios.put(
        `/api/user/${session.user.username}`,
        {
          bio,
          fullName,
          bioPhotoId: bioPhoto,
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
          console.log("Success");
          finishEdit();
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
          {loading && (
            <div className="flex flex-col">
              <PuffLoader color={"#36D7B7"} size={100} />
            </div>
          )}
          <form
            className={`flex flex-col pt-3 rounded ${loading ? "hidden" : ""}`}
            onSubmit={onFormSubmit}
          >
            <label for="bio">Full Name:</label>
            <input
              className="border-2 rounded-md p-1 mb-2 mt-2"
              type="text"
              placeholder={session.user.fullName}
              ref={fullNameRef}
            />
            <label for="bio">Bio: </label>
            <input
              className="border-2 rounded-md p-1 mb-5 mt-2"
              name="bio"
              type="text"
              placeholder={
                session.user.bio ? session.user.bio : "Please Enter A Bio"
              }
              ref={bioRef}
            />
            <label for="profileBanner">Update Profile Banner: </label>
            <input
              className="mb-3 mt-2"
              name="profileBanner"
              accept="image/*"
              multiple
              type="file"
              onChange={onChange}
            />
            <button className="border-2 mt-3 mb-3 bg-yellow-400 p-2 rounded-full w-48 mx-auto hover:bg-yellow-500 hover:text-white">
              Submit
            </button>
          </form>
        </div>
      )}
      <div className="flex flex-col items-center justify-center mt-10">
        <form className={`flex flex-col pt-3 rounded`} onSubmit={onFormDelete}>
          <label for="deleteAccount">Delete Account: </label>
          {error}
          <input
            className="border-2 rounded-md p-1 mb-5 mt-2 w-80"
            name="deleteAccount"
            type="text"
            ref={deleteRef}
            placeholder={`Enter your username to confirm deletion`}
          />
          <button className="border-2 mt-3 mb-3 bg-yellow-400 p-2 rounded-full w-48 mx-auto hover:bg-yellow-500 hover:text-white">
            Delete
          </button>
        </form>
      </div>
    </div>
  );
};

UpdateProfile.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default UpdateProfile;
