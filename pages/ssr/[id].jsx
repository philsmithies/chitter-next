import Layout from "../../components/Layout";
import axios from "axios";
import { server } from "../../util/server";

const fetchData = async () =>
  await axios
    .get(`http://localhost:3000/api/users`)
    .then((res) => ({
      error: false,
      users: res.data,
    }))
    .catch(() => ({
      error: true,
      users: null,
    }));

const Ssr = ({ users, error }) => {
  return (
    <div>
      <ul>
        <li>
          <tbody>
            <h1>hi</h1>
            {/* <p>{user.username}</p> */}
            {users.users.map((user, key) => (
              <tr key={key}>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.name}</td>
              </tr>
            ))}
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
