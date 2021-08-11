import jwt from "jsonwebtoken";
import cookie from "cookie";
import dbConnect from "../../helper/db";

dbConnect();

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { username, password } = req.body;
    if (
      username == process.env.USERNAMEFORFLMS &&
      password == process.env.PASSWORDFORFLMS
    ) {
      const token = jwt.sign({ username }, process.env.JWT_SECRET_KEY, {
        expiresIn: "60m",
      });

      res.setHeader(
        "Set-Cookie",
        cookie.serialize("token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          maxAge: 60 * 60,
          sameSite: "strict",
          path: "/",
        })
      );
      return res.status(200).send(token);
    }
    return res.status(401).send("unauthorized access");
  }
}
