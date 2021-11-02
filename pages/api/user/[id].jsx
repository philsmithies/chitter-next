import dbConnect from "../../../lib/dbConnect";
import User from "../../../models/user";
const { ObjectId } = require("mongodb");

dbConnect();

export default async (req, res) => {
  const user = await User.find({ _id: ObjectId(req.query.id) });
  res.json(user);
};
