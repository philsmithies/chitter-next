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
    <div className=" bg-white flex w-screen justify-between flex-col border-gray-400 border-b-2">
      <div className="flex">
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
        <div className="flex flex-col">
          <div className="flex">
            <p>{props.username || "Full Name"}</p>
            <p className="font-bold">@{props.fullName || "Jimmy"}</p>
            <p>{props.createdAt}</p>
          </div>
          <p>{props.text}</p>
        </div>
      </div>
      <div className="flex justify-between p-2">
        <ChatBubbleOutlineIcon />
        <RepeatIcon />
        <FavoriteBorderIcon
          className="heart"
          // onClick={() => {
          //   likeTweet();
          // }}
        />
        <LinkIcon className="link" />
      </div>
    </div>
  );
}

//   <div className="tweet_content">
//     <div className="username">
//       <Link to={`/profile/${props.username}` || '/'} className="profileLinks">
//         <strong>{props.fullName}</strong>
//       </Link>
//       <small className="usernameText">
//         @{props.username ? props.username : ""}
//       </small>
//       <small className="dateText">{formatDate(props.createdAt)}</small>

//       {/* <div className="threeDots">
//         <MoreHorizIcon/>
//       </div> */}
//     </div>

//     <div className="bodyText">{props.text}</div>
//     <div>
//       {props.imageUrl !== "" ? (
//         <a href ={props.imageUrl || '/'}>
//           <Image
//             className="tweet_photo"
//             cloudName="chitter"
//             publicId={props.imageUrl}
//           />
//         </a>
//       ) : (
//         ""
//       )}
//     </div>
//     <div className="tweet_functions">
//       <ChatBubbleOutlineIcon className="chatBubble" />
//       <RepeatIcon className="retweet" />
//       <FavoriteBorderIcon
//         className="heart"
//         // onClick={() => {
//         //   likeTweet();
//         // }}
//       />
//       <LinkIcon className="link" />
//     </div>
//   </div>
// </div>
// </div>
