// import { useRouter } from "next/router";
import { server } from "../../util/server";
import ProfileFeed from "../../components/ProfileFeed";
import Feed from "../../components/Feed";
import Tweet from "../../components/Tweet";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Link from "next/link";
import Image from "next/image";
import { CloudImage } from "cloudinary-react";
import { format } from "date-fns";

export const getStaticPaths = async () => {
  const res = await fetch(`${server}/api/users/`);
  const data = await res.json();
  // map data to an array of path objects with params (username)
  const paths = data.result.map((user) => {
    return {
      params: { username: user.username.toString() },
    };
  });
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async (context) => {
  const username = context.params.username;
  const res = await fetch(`${server}/api/user/` + username);
  const data = await res.json();
  return {
    props: { user: data.user, tweets: data.tweets },
  };
};

const Profile = ({ user, tweets }) => {
  const formatDate = (date) => {
    return format(new Date(date), "MMM yyyy");
  };

  return (
    <div className="border-2 h-screen max-w-screen-sm m-auto flex flex-col">
      <div className="w-full flex h-20 items-center border-b-2">
        <div className="ml-5">
          <Link href="/">
            <button>
              <ArrowBackIcon className="fill-current text-yellow-400" />
            </button>
          </Link>
        </div>
        <div className="pl-8">
          <h3 className="font-bold text-xl">{user.username}</h3>
          <p className="font-semibold text-gray-600">
            {tweets.length}
            {tweets.length != 1 ? " tweets" : " tweet"}
          </p>
        </div>
      </div>
      <div
        style={{
          width: "100%",
          height: "200px",
          position: "relative",
          overflow: "hidden",
          zIndex: 0,
        }}
        className="bg-red-400"
      >
        <Image
          src="/banner.jpeg"
          layout="fill"
          alt="Banner Image"
          objectFit="cover"
        />
      </div>
      <div className="relative z-10">
        {user.publicId ? (
          <CloudImage
            className="profile_hero"
            cloudName="chitter"
            publicId={user.publicId}
          />
        ) : (
          <img
            src={"/bluetit.jpg"}
            alt="new user"
            className="rounded-full w-20 ml-10 m-minus"
          />
        )}
      </div>
      <button className="font-semibold border-2 bg-yellow-400 w-32 self-end mr-5 mt-2 p-2 rounded-full hover:bg-yellow-500 hover:text-white">
        Follow
      </button>
      <div className="border-b-2 pl-10 pb-6">
        <h3 className="font-bold text-xl mb-1">{user.fullName || ""}</h3>
        <h3 className="text-gray-600 mb-1">@{user.username}</h3>
        <p className="mb-1">{user.bio || "Your first bio"}</p>
        <p className="text-gray-600">
          Joined {user.createdAt ? formatDate(user.createdAt) : "November 2021"}{" "}
        </p>
      </div>

      {tweets.map((tweet) => (
        <Tweet
          key={tweet._id}
          fullName={tweet.user ? tweet.user.fullName : ""}
          // publicId={tweet.user ? tweet.user.publicId : ""}
          // imageUrl={tweet.imageUrl}
          text={tweet.text}
          username={tweet.user ? tweet.user.username : ""}
          createdAt={tweet.createdAt}
        />
      ))}
    </div>
  );
};

export default Profile;
