import React from "react";
import TweetModal from "./TweetModal";
import { useSession } from "next-auth/client";

const Sidebar = () => {
  const [session, loading] = useSession();
  return (
    <>
      <div className="flex flex-col pl-5 pr-5 w-3/12">
        <div className="pt-5">
          <a href="/">
            <img
              src={"/images/bird.png"}
              className="mr-5 p-2 h-14"
              alt="chitter logo"
            />
          </a>
        </div>
        <div className="flex pt-3 pb-3 rounded-full">
          <img src={"/images/hashtag.png"} alt="hashtag" className="h-7 pl-3" />
          <h1 className="self-center pl-2">Explore</h1>
        </div>
        {/* {data ? <TweetModal /> : <TweetModal link={"/signup"} />} */}

        <TweetModal user={session ? session.user : ""} />
      </div>
    </>
  );
};

export default Sidebar;
