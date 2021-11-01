import React from "react";
import TweetModal from "./TweetModal";

const Sidebar = (user) => {
  return (
    <>
      <div>
        <div>
          <a href="/">
            <img src={"bird.png"} className="max-w-1/4" alt="chitter logo" />
          </a>
        </div>
        <TweetModal user={user} />
      </div>
      <div>
        <a href="/">
          <h1 className="menuItem">
            <img src={"hashtag.png"} alt="hashtag" className="hashtag" />{" "}
            Explore
          </h1>
        </a>
        {/* {data ? <TweetModal /> : <TweetModal link={"/signup"} />} */}
      </div>
    </>
  );
};

export default Sidebar;
