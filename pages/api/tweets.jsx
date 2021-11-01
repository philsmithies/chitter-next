import dbConnect from "../../lib/dbConnect";
import Tweet from "../../models/tweet";
require("../../models/user");

dbConnect();

export default async (req, res) => {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const tweets = await Tweet.find()
          .sort({ createdAt: "desc" })
          .populate("user");
        res.status(200).json({ success: true, result: tweets });
      } catch (error) {
        console.log(error);
        res.status(400).json({ success: false });
      }
      break;
    case "POST":
      try {
        const tweet = await Tweet.create(req.body);
        res.status(201).json({ success: true, result: tweet });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
};
