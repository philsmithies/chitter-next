import dbConnect from "../../../lib/dbConnect";
import User from "../../../models/user";
import Tweet from "../../../models/tweet";
const { ObjectId } = require("mongodb");

dbConnect();

export default async (req, res) => {
  const { method } = req;
  switch (method) {
    case "GET":
      try {
        const reqUser = await User.findOne({ username: req.query.id });
        let foundTweets = await Tweet.find({ user: reqUser._id })
          .populate("user")
          .sort({ createdAt: "desc" });
        res.json({ user: reqUser, tweets: foundTweets, success: true });
      } catch (error) {
        console.log(error);
        res.status(400).json({ success: false });
      }
      break;
    case "PUT":
      try {
        await User.findOneAndUpdate(
          { username: req.query.id },
          {
            bio: req.body.bio,
            fullName: req.body.fullName,
            image: req.body.image,
            bioPhotoId: req.body.bioPhotoId,
          }
        );
        res.status(201).json({ success: true });
      } catch (error) {
        return res.status(400).json({ message: "failed" });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
};
