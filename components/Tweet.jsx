import RetweetIcon from "../public/assets/retweet-icon.svg";
import ChatBubbleOutlineIcon from "../public/assets/quote-outline.svg";
import LikeIcon from "../public/assets/like-icon.svg";
import LinkIcon from "../public/assets/copy-icon.svg";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { Link } from "next/link";
import { format } from "date-fns";
import { Image } from "cloudinary-react";

export default function Tweet(props) {
  const formatDate = (date) => {
    return format(new Date(date), "E MMM dd yyyy");
  };

  return (
    <div className="bg-white border-gray-400 border-b-2 w-full">
      <div className="flex pt-2 pl-2">
        <div>
          {props.publicId ? (
            <Image cloudName="chitter" publicId={props.publicId} />
          ) : (
            <img
              className="w-14 rounded-full"
              src={"/bluetit.jpg"}
              alt="new user"
            ></img>
          )}
        </div>
        <div className="flex flex-col w-full">
          <a href={`/profile/${props.username}`}>
            <div className="flex ml-2 pb-1">
              <p className="font-bold">{props.fullName || "Jimmy"}</p>
              <p className="ml-1 text-gray-600">
                @{props.username || "Full Name is missing"}
              </p>
              <p className="font-bol ml-1 text-gray-600">
                {formatDate(props.createdAt)}
              </p>
            </div>
          </a>
          <p className="ml-2 pb-2">{props.text}</p>
          <div className="flex justify-between pb-4 pt-2 pl-2 pr-2">
            <ChatBubbleOutlineIcon className="w-5" />
            <RetweetIcon className="w-5" />
            <LikeIcon
              className="w-5"
              // onClick={() => {
              //   likeTweet();
              // }}
            />
            <LinkIcon className="w-5 mr-2" />
          </div>
        </div>
      </div>
    </div>
  );
}
