import { connectToDatabase } from "../util/mongodb";
import SideArrow from "../public/assets/composer-icon.svg";

export default function Tweets({ tweets }) {
  return (
    <div className="h-full">
      {/* <img
        src={"../public/arrow.svg"}
        className="fill-current text-yellow-400"
      /> */}
      <SideArrow />
      <h1>Top 20 Tweets of All Time</h1>
    </div>
  );
}

export async function getServerSideProps() {
  const { db } = await connectToDatabase();
  const tweets = await db.collection("tweets").find({}).limit(20).toArray();
  return {
    props: {
      tweets: JSON.parse(JSON.stringify(tweets)),
    },
  };
}
