import { useRouter } from "next/router";

const Profile = ({ user }) => {
  return (
    <div className="h-screen">
      <h2>Hello I am {user._id}</h2>
    </div>
  );
};

export const getStaticProps = async (context) => {
  const res = await fetch(
    `http://localhost:3000/api/user/${context.params.id}`
  );

  const user = await res.json();
  console.log(user);
  return {
    props: {
      user,
    },
  };
};

export const getStaticPaths = async () => {
  const res = await fetch("http://localhost:3000/api/users/");

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
