import Layout from "../../components/Layout";
import axios from "axios";
import { server } from "../../util/server";

const fetchData = async () =>
  await axios
    .get(`http://localhost:3000/api/user/phil123`)
    .then((res) => ({
      error: false,
      data: res.data,
    }))
    .catch(() => ({
      error: true,
      data: null,
    }));

const Ssr = ({ data, error }) => {
  console.log(data.user.fullName);
  return (
    <div>
      <ul>
        <li>
          <tbody>
            <h1>hi</h1>
            {/* <p>{user.username}</p> */}
            <h2>{data.user.username} is here</h2>
            {/* <td>{user.email}</td>
            <td>{user.name}</td> */}
          </tbody>
        </li>
      </ul>
    </div>
  );
};

// export const getServerSideProps = async () => {
//   const data = await fetchData();
//   return {
//     props: data,
//   };
// };

export const getServerSideProps = async ({ params, res }) => {
  const data = await fetchData();
  return {
    props: data,
  };
};

Ssr.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default Ssr;
