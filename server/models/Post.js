import mongoose from "mongoose";
const Schema = mongoose.Schema;

const Caption = new Schema(
  {
    caption: { type: String, required: true },
    style: { type: String, required: true },
    score: { type: Number, required: true }
  }

)

const Post = new Schema(
  {
    user: { type: String, required: true },
    title: { type: String, required: true },
    imgUrl: { type: String, required: true },
    score: { type: Number, required: true },
    captions: { Caption }
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

export default Post;