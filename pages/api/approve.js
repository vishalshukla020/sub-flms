import Post from "../../models/Post";
var request = require("request");

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      if (req.body.type == "payment") {
        const user = await Post.findByIdAndUpdate(req.body._id, {
          payment: true,
        });

        if (user) {
          request.post(
            {
              url: "https://www.fast2sms.com/dev/bulkV2",
              headers: {
                authorization: process.env.FAST2SMS,
              },
              form: {
                message:
                  "kindly follow the link to pay the fee 'https://imjo.in/8xHkVg' for your approved job request at 'FrontLine Security Services'. Phone no.+91-9984-183-277",
                language: "english",
                route: "q",
                numbers: req.body.phone,
              },
            },
            (err, response, body) => {
              if (err) {
                console.log(err.message);
                return res.status(400).send(err);
              } else {
                return res
                  .status(200)
                  .send({ msg: "Sent successfully", data: response });
              }
            }
          );
        } else {
          return res.status(404).send("user not found");
        }
      }

      if (req.body.type == "approve") {
        const user = await Post.findByIdAndUpdate(req.body._id, {
          approved: true,
        });

        if (user) {
          request.post(
            {
              url: "https://www.fast2sms.com/dev/bulkV2",
              headers: {
                authorization: process.env.FAST2SMS,
              },
              form: {
                message: "Your job request has been approved at FLMS",
                language: "english",
                route: "q",
                numbers: req.body.phone,
              },
            },
            (err, response, body) => {
              if (err) {
                console.log(err.message);
                return res.status(400).send(err);
              } else {
                return res
                  .status(200)
                  .send({ msg: "Sent successfully", data: response });
              }
            }
          );
        } else {
          return res.status(404).send("user not found");
        }
      }
    } catch (error) {
      return res.status(400).send(error);
    }
  } else {
    return res.status(404).send("Method not allowed");
  }
}
