import { dbContext } from "../db/DbContext";
import { BadRequest } from "../utils/Errors";

class PostsService {
  
  async getAllPosts(query = {}) {
    return await dbContext.Posts.find(query)
  }
  async getOnePost(postId) {
    return await dbContext.Posts.findById({ _id: postId })
  }
  async getAllCaptions(postId) {
    return await dbContext.Posts.findById({ _id: postId })
  }
  async getOneCaption(postId, captionId) {
    return await dbContext.Posts.findById({
      _id: postId, caption: { _id: captionId }
    })
  }
  async createPost(body) {
    return await dbContext.Posts.create(body)
  }
  async createCaption(postId, body) {
    return await dbContext.Posts.findByIdAndUpdate(
      { _id: postId },
      { $addToSet: { caption: body } },
      { new: true }
    );
  }

  async updateCaptionScore(postId, captionId, body) {
    return await dbContext.Posts.updateOne(
      {_id: postId, "caption._id": captionId}, 
     {$set: { "caption.$.score": body.score } },
      { new: true })
  }
  async deletePost(postId) {
    await dbContext.Posts.findByIdAndDelete(postId)
  }

}

export const postsService = new PostsService
