import dbConnect from "../../helper/db";
import Post from "../../models/Post";
dbConnect();

export default async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;
    let phone = req.body.phone;

    const post = await new Post({
      ...data,
      phone: phone.slice(phone.length - 10),
    }).save();
    res.status(200).json(post);
  }
}
