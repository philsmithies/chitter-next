import useSwr from "swr";
import Link from "next/link";
import Tweet from "./Tweet";
import PuffLoader from "react-spinners/PuffLoader";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function ProfileFeed({ username }) {
  const { data, error } = useSwr(`/api/user/${username}`, fetcher);

  if (error) return <div>Failed to load Tweets</div>;

  return (
    <div className="flex justify-center border-2">
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
                  // publicId={tweet.user ? tweet.user.publicId : ""}
                  // imageUrl={tweet.imageUrl}
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
