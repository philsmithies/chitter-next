import React from "react";
import TweetModal from "./TweetModal";
import Link from "next/link";

const Sidebar = (user) => {
  return (
    <>
      <div className="flex bg-yellow-200 flex-col pl-5 pr-5">
        <div className="pt-5">
          <a href="/">
            <img
              src={"bird.png"}
              className="hover:bg-yellow-400 rounded-r-xl mr-5 p-2 h-14"
              alt="chitter logo"
            />
          </a>
        </div>
        <a href="/">
          <div className="flex pt-3 pb-3 rounded-full hover:bg-yellow-400">
            <img src={"hashtag.png"} alt="hashtag" className="h-7 pl-3" />
            <h1 className="self-center pl-2">Explore</h1>
          </div>
        </a>
        {/* {data ? <TweetModal /> : <TweetModal link={"/signup"} />} */}

        <TweetModal user={user} />
      </div>
    </>
  );
};

export default Sidebar;
