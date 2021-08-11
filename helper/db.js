import mongoose from "mongoose";

export default function connectDB() {
  if (mongoose.connections[0].readyState) {
    console.log("already connected");
    return;
  }

  mongoose
    .connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    })
    .then(() => console.log("connected to db"))
    .catch((err) => console.log(err));
}
