import Layout from "../../components/Layout";
import axios from "axios";
import { server } from "../../util/server";
import Link from "next/link";
// import { useRouter } from "next/router";
import Feed from "../../components/Feed";
import Tweet from "../../components/Tweet";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
// import Image from "next/image";
import { Image } from "cloudinary-react";
import { format } from "date-fns";
import { useRouter } from "next/router";

const fetchData = async (id) =>
  await axios
    .get(`${server}/api/user/${id}`)
    .then((res) => ({
      error: false,
      data: res.data,
    }))
    .catch(() => ({
      error: true,
      data: null,
    }));

const Profile = ({ data, error }) => {
  const formatDate = (date) => {
    return format(new Date(date), "MMM yyyy");
  };

  return (
    <div className="border-l-2 border-r-2 h-full max-w-screen-sm m-auto flex flex-col">
      <div className="w-full flex h-20 items-center border-b-2">
        <div className="ml-5">
          <Link href="/">
            <button>
              <ArrowBackIcon className="fill-current text-yellow-400" />
            </button>
          </Link>
        </div>
        <div className="pl-8">
          <h3 className="font-bold text-xl">{data.user.username}</h3>
          <p className="font-semibold text-gray-600">
            {data.tweets.length}
            {data.tweets.length != 1 ? " tweets" : " tweet"}
          </p>
        </div>
      </div>
      <div
        style={{
          width: "100%",
          height: "200px",
          position: "relative",
          overflow: "hidden",
          zIndex: 10,
        }}
        className="bg-red-400 h-screen"
      >
        <img
          src="/images/banner.jpeg"
          layout="fill"
          alt="Banner Image"
          objectFit="cover"
        />
      </div>
      <div className="relative z-10">
        {data.user.publicId ? (
          <Image
            className="profile_hero"
            cloudName="chitter"
            publicId={data.user.publicId}
          />
        ) : (
          <img
            src={"/images/bluetit.jpg"}
            alt="new user"
            className="rounded-full w-20 ml-10 m-minus"
          />
        )}
      </div>
      <button className="font-semibold border-2 bg-yellow-400 w-32 self-end mr-5 mt-2 p-2 rounded-full hover:bg-yellow-500 hover:text-white">
        Follow
      </button>
      <div className="border-b-2 pl-10 pb-6">
        <h3 className="font-bold text-xl mb-1">{data.user.fullName || ""}</h3>
        <h3 className="text-gray-600 mb-1">@{data.user.username}</h3>
        <p className="mb-1">{data.user.bio || "Your first bio"}</p>
        <p className="text-gray-600">
          Joined{" "}
          {data.user.createdAt
            ? formatDate(data.user.createdAt)
            : "November 2021"}{" "}
        </p>
      </div>

      {data.tweets.map((tweet) => (
        <Tweet
          key={tweet._id}
          fullName={tweet.user ? tweet.user.fullName : ""}
          publicId={tweet.user ? tweet.user.image : ""}
          imageUrl={tweet.imageUrl ? tweet.imageUrl : ""}
          text={tweet.text}
          username={tweet.user ? tweet.user.username : ""}
          createdAt={tweet.createdAt}
        />
      ))}
    </div>
  );
};

export const getServerSideProps = async ({ params, res }) => {
  try {
    const { id } = params;
    const data = await fetchData(id);
    return {
      props: data,
    };
  } catch {
    res.statusCode = 404;
    return {
      props: {},
    };
  }
};

Profile.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default Profile;
