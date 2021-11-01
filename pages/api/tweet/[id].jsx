import { connectToDatabase } from "../../../util/mongodb";
const { ObjectId } = require("mongodb");
import dbConnect from "../../../lib/dbConnect";
import Tweet from "../../../models/tweet";

dbConnect();

export default async (req, res) => {
  const tweet = await Tweet.find({ _id: ObjectId(req.query.id) }).populate(
    "user"
  );
  res.json(tweet);
};
