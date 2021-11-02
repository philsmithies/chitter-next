import { useRouter } from "next/router";
import { server } from "../../util/server";

const Profile = ({ user }) => {
  console.log(user);
  return (
    <div className="h-screen">
      <h2>Hello I am {user.username}</h2>
    </div>
  );
};

export const getStaticProps = async (context) => {
  const res = await fetch(`${server}/api/user/${context.params.id}`);

  const user = await res.json();
  console.log(user);
  return {
    props: {
      user,
    },
  };
};

export const getStaticPaths = async () => {
  const res = await fetch(`${server}/api/users/`);

  const users = await res.json();
  const ids = users.result.map((user) => user._id);
  const paths = ids.map((id) => ({ params: { id: id.toString() } }));

  return {
    paths,
    fallback: false,
  };
};

// export const getStaticPaths = async () => {
//   const res = await fetch(`https://jsonplaceholder.typicode.com/posts`)

//   const articles = await res.json()

//   const ids = articles.map((article) => article.id)
//   const paths = ids.map((id) => ({ params: { id: id.toString() } }))

//   return {
//     paths,
//     fallback: false,
//   }
// }

export default Profile;
