import BaseController from "../utils/BaseController";
import { postsService } from "../services/PostsService";

let _endpoint = "posts"

export class PostsController extends BaseController {
  
  constructor() {
    super("api/" + _endpoint)
    this.router
      .get("", this.getAllPosts)
      .get("/:postId", this.getOnePost)
      .get("/:postId/captions", this.getAllCaptions)
      .get("/:postId/captions/:captionId", this.getOneCaption)
      .post("", this.createPost)
      .post("/:postId/captions", this.createCaption)
      .put("/:postId/captions/:captionId", this.updateCaptionScore)
      .delete("/:postId", this.deletePost)

  }
  async getAllPosts(req, res, next) {
    try {
      res.send({ data: await postsService.getAllPosts(req.query), message: "you got all " + _endpoint })
    } catch (error) {
      next(error)
    }
  }
  async getOnePost(req, res, next) {
    try {
      res.send({ data: await postsService.getOnePost(req.params.postId), message: "got " + _endpoint + " by id" })
    } catch (error) {
      next(error)
    }
  }
  async getAllCaptions(req, res, next) {
    try {
      res.send({ data: await postsService.getAllCaptions(req.params.postId), message: "got all captions on post" + req.params.postId })
    } catch (error) {
      next(error)
    }
  }
  async getOneCaption(req, res, next) {
    try {
      res.send({ data: await postsService.getOneCaption(req.params.postId, req.params.captionId), message: `got one caption(${req.params.captionId}) on post(${req.params.postId})` })
    } catch (error) {
      next(error)
    }
  }
  async createPost(req, res, next) {
    try {
      res.send({ data: await postsService.createPost(req.body), message: "created a post" })
    } catch (error) {
      next(error)
    }
  }
  async createCaption(req, res, next) {
    try {
      res.send({ data: await postsService.createCaption(req.params.postId, req.body), message: "created a caption" })
    } catch (error) {
      next(error)
    }
  }

  async updateCaptionScore(req, res, next) {
    try {
      res.send({ data: await postsService.updateCaptionScore(req.params.postId, req.params.captionId, req.body), message: "updated score" })
    } catch (error) {
      next(error)
    }
  }

  async deletePost(req, res, next) {
    try {
      await postsService.deletePost(req.params.postId)
      res.send("you deleted a post")
    } catch (error) {
      next(error)
    }
  }
}
