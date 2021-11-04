// import { useRouter } from "next/router";
import { server } from "../../util/server";
import ProfileFeed from "../../components/ProfileFeed";
import Feed from "../../components/Feed";
import Tweet from "../../components/Tweet";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Link from "next/link";
import Image from "next/image";

export const getStaticPaths = async () => {
  const res = await fetch(`${server}/api/users/`);
  const data = await res.json();
  // map data to an array of path objects with params (username)
  const paths = data.result.map((user) => {
    console.log(user.username);
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
  console.log(tweets);
  return (
    <div className="border-2 h-screen">
      <div className="bg-red-400 w-full flex h-20 items-center">
        <div className="ml-5">
          <Link href="/">
            <ArrowBackIcon style={{ fill: "orange" }} />
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
      <div>
        <Image src="banner.jpeg" alt="Sample Banner" width={500} height={500} />
      </div>

      <p>{user.fullName}</p>
      <p>{user.email}</p>
      <p>{user.image}</p>
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
