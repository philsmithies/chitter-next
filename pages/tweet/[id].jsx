import Tweet from "../../components/Tweet";
import { format } from "date-fns";
import Layout from "../../components/Layout";
import axios from "axios";

const fetchData = async (id) =>
  await axios
    .get(`${server}/api/tweet/${id}`)
    .then((res) => ({
      error: false,
      data: res.data,
    }))
    .catch(() => ({
      error: true,
      data: null,
    }));

const TweetPage = ({ data, error }) => {
  const formatDate = (date) => {
    return format(new Date(date), "MMM yyyy");
  };

  return (
    <div>
      <p>Tweet here</p>
      <h2>{!error ? "all good" : ""}</h2>
      <h2>{data}</h2>
      {/* <h2>{data.tweet.text}</h2> */}
      {/* <Tweet
        key={tweet._id}
        fullName={tweet.user ? tweet.user.fullName : ""}
        publicId={tweet.user ? tweet.user.image : ""}
        imageUrl={tweet.imageUrl ? tweet.imageUrl : ""}
        text={tweet.text}
        username={tweet.user ? tweet.user.username : ""}
        createdAt={tweet.createdAt}
      /> */}
    </div>
  );
};

export const getServerSideProps = async ({ params, res }) => {
  try {
    const { id } = params;
    const data = await fetchData(id);
    console.log(data);
    return {
      props: data,
    };
  } catch {
    res.statusCode = 404;
    return {
      props: {},
    };
  }
};

TweetPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default TweetPage;
