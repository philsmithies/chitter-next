// import { useRouter } from "next/router";
import { server } from "../../util/server";

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
    <div>
      <p>{user.username}</p>
      <p>{user.fullName}</p>
      <p>{user.email}</p>
      {tweets.map((tweet) => (
        <p>{tweet.text}</p>
      ))}
    </div>
  );
};

export default Profile;
