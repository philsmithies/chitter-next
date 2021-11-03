// import { useRouter } from "next/router";
import { server } from "../../util/server";
import ProfileFeed from "../../components/ProfileFeed";
import Feed from "../../components/Feed";
import Tweet from "../../components/Tweet";

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
      <p>{user.username}</p>
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
