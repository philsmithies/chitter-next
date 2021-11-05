import RetweetIcon from "../public/assets/retweet-icon.svg";
import ChatBubbleOutlineIcon from "../public/assets/quote-outline.svg";
import LikeIcon from "../public/assets/like-icon.svg";
import LinkIcon from "../public/assets/copy-icon.svg";
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
          {props.publicId !== "no image" ? (
            <Image
              cloudName="chitter"
              publicId={props.publicId}
              className="w-14 h-14 rounded-full"
            />
          ) : (
            <img
              className="w-14 rounded-full"
              src={"/images/bluetit.jpg"}
              alt="new user image"
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
          <div className="pr-6 ml-2 mb-2">
            {props.imageUrl !== "" ? (
              <a href={props.imageUrl || "/"}>
                <Image
                  className="object-cover mt-0.5 max-h-72 w-full rounded-md"
                  cloudName="chitter"
                  publicId={props.imageUrl}
                />
              </a>
            ) : (
              ""
            )}
          </div>
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
