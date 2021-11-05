import useSwr from "swr";
import Link from "next/link";
import Tweet from "../Tweet";
import PuffLoader from "react-spinners/PuffLoader";
import styles from "./Feed.module.css";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Feed() {
  const { data, error } = useSwr("/api/tweets", fetcher);

  if (error) return <div>Failed to load Tweets</div>;

  return (
    <div className={styles.feedWrapper}>
      {!data && (
        <div className="mt-4">
          <PuffLoader color={"#36D7B7"} size={60} />
        </div>
      )}
      {data && (
        <ul className="flex-1">
          {data.result &&
            data.result.map((tweet) => (
              <li key={tweet._id}>
                {/* <Link href="/tweet/[id]" as={`/tweet/${tweet._id}`}>
            <a>{`Tweet ${tweet.text}`}</a>
          </Link> */}
                <Tweet
                  key={tweet._id}
                  fullName={tweet.user ? tweet.user.fullName : ""}
                  publicId={tweet.user ? tweet.user.image : ""}
                  imageUrl={tweet.imageUrl ? tweet.imageUrl : ""}
                  text={tweet.text}
                  username={tweet.user ? tweet.user.username : ""}
                  createdAt={tweet.createdAt}
                />
              </li>
            ))}
        </ul>
      )}
    </div>
  );
}
