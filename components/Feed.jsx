import useSwr from "swr";
import Link from "next/link";
import Tweet from "./Tweet";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Feed() {
  const { data, error } = useSwr("/api/tweets", fetcher);

  if (error) return <div>Failed to load Tweets</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div className="flex justify-center w-full bg-red-700 border-2">
      <ul className="flex-1">
        {data.result &&
          data.result.map((tweet) => (
            <li key={tweet._id}>
              {/* <Link href="/tweet/[id]" as={`/tweet/${tweet._id}`}>
            <a>{`Tweet ${tweet.text}`}</a>
          </Link> */}
              <Tweet
                key={tweet._id}
                fullName={tweet.user.fullName ? tweet.user.fullName : ""}
                // publicId={tweet.user ? tweet.user.publicId : ""}
                // imageUrl={tweet.imageUrl}
                text={tweet.text}
                username={tweet.user.username ? tweet.user.username : ""}
                createdAt={tweet.createdAt}
              />
            </li>
          ))}
      </ul>
    </div>
  );
}
