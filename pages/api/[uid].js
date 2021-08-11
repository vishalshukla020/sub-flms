import dbConnect from "../../helper/db";
dbConnect();
import Post from "../../models/Post";

export default async function handler(req, res) {
  const query = req.query.uid;
  const user = await Post.findOne({ _id: query });
  res.status(200).send(user);
}
