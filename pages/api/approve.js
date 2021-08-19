const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = require("twilio")(accountSid, authToken);
import Post from "../../models/Post";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      if (req.body.type == "payment") {
        const user = await Post.findByIdAndUpdate(req.body._id, {
          payment: true,
        });

        if (user) {
          await client.messages
            .create({
              from: "+14357408562",
              body: "kindly follow the link to pay the fee 'https://imjo.in/8xHkVg' for your approved job request at 'FrontLine Security Services'. Phone no.+91-9984-183-277",
              to: `+91${req.body.phone}`,
            })
            .then(() => {
              return res.status(200).send("Approved successfully");
            })
            .catch((err) => {
              return res.status(403).send(err);
            });
          return;
        }
        return res.status(404).send("user not found");
      }

      if (req.body.type == "approve") {
        const user = await Post.findByIdAndUpdate(req.body._id, {
          approved: true,
        });

        if (user) {
          await client.messages
            .create({
              from: "+14357408562",
              body: "Your job request has been approved at 'FrontLine Security Services'",
              to: `+91${req.body.phone}`,
            })
            .then(() => {
              return res.status(200).send("Approved successfully");
            })
            .catch((err) => {
              return res.status(403).send(err);
            });
          return;
        }
        return res.status(404).send("user not found");
      }
    } catch (error) {
      return res.status(400).send(error);
    }
  }
  res.status(404).send("Method not allowed");
}
