import { connectToDatabase } from "../../../util/mongodb";
const { ObjectId } = require("mongodb");
import dbConnect from "../../../lib/dbConnect";
import Tweet from "../../../models/tweet";

dbConnect();

export default async (req, res) => {
  try {
    const tweet = await Tweet.findOne({ _id: ObjectId(req.query.id) }).populate(
      "user"
    );
    res.json({ tweet, success: true });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false });
  }
};
