import jwt from "jsonwebtoken";
import dbConnect from "../../helper/db";
import Post from "../../models/Post";

dbConnect();

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const data = req.headers.authorization;
      const user = jwt.verify(data, process.env.JWT_SECRET_KEY);
      if (user) {
        await Post.find().then((posts) => {
          res.status(200).send(posts);
        });
      }
    } catch (error) {
      res.status(404).send(error);
    }
  }
}
