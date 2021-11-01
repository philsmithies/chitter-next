import dbConnect from "../../../lib/dbConnect";
import User from "../../../models/user";
const { ObjectId } = require("mongodb");

dbConnect();

export default async (req, res) => {
  const user = await User.find({ _id: ObjectId(req.query.id) });
  res.json(user);

  // getAllTweets: async (req, res) => {
  //   const reqUser = await UserModel.findOne({ username: req.params.username });
  //   let foundUser = await TweetModel.find({ author: reqUser._id })
  //     .populate("author")
  //     .sort({ createdAt: "desc" });
  //   res.json(foundUser);
  // },
};
