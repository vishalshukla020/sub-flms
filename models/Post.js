const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    formName: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    approved: {
      type: Boolean,
      default: false,
    },
    payment: {
      type: Boolean,
      default: false,
    },
  },
  { strict: false }
);

mongoose.models = {};
var Post = mongoose.model("Post", postSchema);
export default Post;
