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
              src={"bluetit.jpg"}
              alt="new user"
            ></img>
          )}
        </div>
        <div className="flex flex-col w-full">
          <div className="flex ml-2 pb-1">
            <p>{props.username || "Full Name"}</p>
            <p className="font-bold ml-1">@{props.fullName || "Jimmy"}</p>
            <p>{props.createdAt}</p>
          </div>
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
