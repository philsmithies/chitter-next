import Layout from "../components/Layout";
import axios from "axios";

const fetchData = async (id) =>
  await axios
    .get(`${server}/api/user/${id}`)
    .then((res) => ({
      error: false,
      users: res.data,
    }))
    .catch(() => ({
      error: true,
      users: null,
    }));

const Ssr = ({ user }) => {
  return (
    <div>
      <ul>
        <li>
          <tbody>
            {/* {user.map((user, key) => (
              <tr key={key}>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.name}</td>
              </tr>
            ))} */}
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
  try {
    const { id } = params;
    const user = await fetchData(id);
    return {
      props: { user },
    };
  } catch {
    res.statusCode = 404;
    return {
      props: {},
    };
  }
};

Ssr.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default Ssr;
