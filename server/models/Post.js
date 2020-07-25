import mongoose from "mongoose";
const Schema = mongoose.Schema;

const caption = new Schema(
  {
    caption: { type: String, required: true },
    style: { type: String, required: true, default: 'blackNwhite' },
    score: { type: Number, required: true, default: 0 }
  }

)

const Post = new Schema(
  {
    username: { type: String, required: true },
    title: { type: String, required: true },
    imgUrl: { type: String, required: true },
    score: { type: Number, required: true, default: 0 },
    caption: [caption],
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

export default Post;