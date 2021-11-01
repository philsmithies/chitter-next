import RepeatIcon from "@material-ui/icons/Repeat";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import LinkIcon from "@material-ui/icons/Link";
import { Link } from "next/link";
import { format } from "date-fns";
import { Image } from "cloudinary-react";

export default function Tweet(props) {
  const formatDate = (date) => {
    return format(new Date(date), "E MMM dd yyyy");
  };

  return (
    <div className="bg-white flex p-10 flex-col">
      <p>{props.username || "Jim Full Name"}</p>
      <p>{props.fullName || "Jimmy"}</p>
      {/* <p>{props.createdAt}</p> */}
      <p>{props.text}</p>
    </div>
  );
}
