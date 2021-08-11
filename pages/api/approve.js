const fast2sms = require("fast-two-sms");
import Post from "../../models/Post";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      if (req.body.type == "payment") {
        const user = await Post.findByIdAndUpdate(req.body._id, {
          payment: true,
        });

        if (user) {
          await fast2sms
            .sendMessage({
              authorization: process.env.FAST2SMS,
              message:
                "kindly follow the link to pay the fee 'https://imjo.in/8xHkVg' for your approved job request at 'FrontLine Security Services'. Phone no.+91-9984-183-277",
              numbers: [req.body.phone],
            })
            .then(() => {
              return res.status(200).send("Approved successfully");
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
          await fast2sms
            .sendMessage({
              authorization: process.env.FAST2SMS,
              message: `Your job request has been approved at 'FrontLine Security Services'`,
              numbers: [req.body.phone],
            })
            .then(() => {
              return res.status(200).send("Approved successfully");
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
