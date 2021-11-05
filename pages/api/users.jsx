import dbConnect from "../../lib/dbConnect";
import User from "../../models/user";
import { hash } from "bcryptjs";

dbConnect();

export default async (req, res) => {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const users = await User.find({});
        res.status(200).json({ success: true, result: users });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "POST":
      try {
        const { password, username, fullName, image } = req.body;

        const checkExisting = await User.findOne({ username: username });
        if (checkExisting) {
          res.status(422).json({ message: "User already exists" });
          return;
        }
        const user = await User.create({
          password: await hash(password, 12),
          username,
          fullName,
          image,
        });
        res.status(201).json({ success: true, result: user });
      } catch (error) {
        console.log(error);
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
};
