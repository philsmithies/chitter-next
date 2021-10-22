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
        const { email, password, username, name, publicId } = req.body;
        if (!email || !email.includes("@") || !password) {
          res.status(422).json({ message: "Invalid Data" });
          return;
        }
        const checkExisting = await User.findOne({ email: email });
        if (checkExisting) {
          res.status(422).json({ message: "User already exists" });
          client.close();
          return;
        }
        const user = await User.create({
          email,
          password: await hash(password, 12),
          username,
          name,
          publicId,
        });
        res.status(201).json({ success: true, result: user });
        client.close();
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
};
