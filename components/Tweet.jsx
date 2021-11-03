import RepeatIcon from "@material-ui/icons/Repeat";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import LinkIcon from "@material-ui/icons/Link";
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
          <p className="ml-2 pb-5">{props.text}</p>
          <div className="flex justify-between p-2">
            <ChatBubbleOutlineIcon className="h-3" />
            <RepeatIcon />
            <FavoriteBorderIcon
            // onClick={() => {
            //   likeTweet();
            // }}
            />
            <LinkIcon />
          </div>
        </div>
      </div>
    </div>
  );
}
