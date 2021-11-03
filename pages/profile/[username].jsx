// import { useRouter } from "next/router";
import { server } from "../../util/server";

// const Profile = ({ post }) => {
//   return (
//     <div className="h-screen">
//       <h1>Slug: {post.username}</h1>
//     </div>
//   );
// };

// export async function getStaticPaths() {
//   const res = await fetch(`${server}/api/users/`);
//   const posts = await res.json();
//   const paths = posts.result.map((post) => ({
//     params: { slug: [post.toString()] },
//   }));

//   return {
//     paths,
//     fallback: false,
//   };
// }

// export async function getStaticProps({ params }) {
//   const { slug } = params;

//   const res = await fetch(`${server}/api/user?Slug=${slug}`);
//   const data = await res.json();
//   const post = data[0];

//   return {
//     props: { post },
//   };
// }

// export async function getStaticPaths() {
//   // Call an external API endpoint to get posts
//   const res = await fetch(`${server}/api/users/`);
//   const users = await res.json();
//   console.log(users);
//   // Get the paths we want to pre-render based on posts
//   const paths = users.result.map((user) => ({
//     params: { slug: { username: user.toString() } },
//   }));

//   // We'll pre-render only these paths at build time.
//   // { fallback: false } means other routes should 404.
//   return { paths, fallback: false };
// }

// export async function getStaticProps({ slug }) {
//   // params contains the post `username`.
//   // If the route is like /posts/1, then params.username is 1
//   const res = await fetch(`${server}/api/user/${context.params.slug}`);
//   const post = await res.json();

//   // Pass post data to the page via props
//   return { props: { user } };
// }

//

// export const getStaticProps = async () => {
//   const res = await fetch(`${server}/api/user/phil1`);
//   const user = await res.json();
//   console.log(user);
//   return {
//     props: {
//       user,
//     },
//   };
// };

// export const getStaticPaths = async () => {
//   const res = await fetch(`${server}/api/users/`);
//   const users = await res.json();
//   console.log(users);
//   const usernames = users.result.map((user) => user._username);
//   const paths = usernames.map((username) => ({ params: { username: username.toString() } }));
//   return {
//     paths,
//     fallback: false,
//   };
// };

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

const Details = ({ user, tweets }) => {
  console.log(tweets);
  return (
    <div>
      <p>{user.username}</p>
      <p>{user.fullName}</p>
      <p>{user.email}</p>
      <p>{tweets[0].text}</p>;
    </div>
  );
};

export default Details;

// export default Profile;
