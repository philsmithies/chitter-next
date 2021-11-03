import dbConnect from "../../../lib/dbConnect";
import User from "../../../models/user";
import Tweet from "../../../models/tweet";
const { ObjectId } = require("mongodb");

dbConnect();

export default async (req, res) => {
  const reqUser = await User.findOne({ username: req.query.id });
  let foundUser = await Tweet.find({ user: reqUser._id });
  // .populate("user")
  // .sort({ createdAt: "desc" });
  res.json(reqUser);
};
