import store from "../store.js";
import Post from "../Models/Post.js"
import { get } from "mongoose";


// @ts-ignore
const _postApi = axios.create({
  baseURL: "http://localhost:3000/api/",
  timeout: 3000
})


class PostsService {
  constructor() {
    this.getPosts()

  }

  
  createPost(rawPostData) {
_postApi.post("posts/", rawPostData).then(res => {
  this.getPosts()
}).catch(err => console.error(err))
  }

  createCaption(rawCaptionData, postId) {
_postApi.post("posts/" + postId + "/captions", rawCaptionData).then(res => {
this.getPosts()
}).catch(err => console.error(err))
  }

  getPosts() {
    _postApi.get("posts").then(res => {
      console.log(res.data)
      store.commit("posts", res.data.data.map(rawPostData => new Post(rawPostData)))
    }).catch(err => console.error(err))
  }

  deletePost(postId) {
    _postApi.delete("posts/" + postId).then(res => {
      store.commit("posts", store.State.posts.filter(p => p._id != postId))
    }).catch(err => console.error(err))
  }

  upvoteCaption(captionId, postId) {
    let updatedScore = store.State.posts.find(c => c.caption._id == captionId)
    updatedScore.score++
    _postApi.put("posts/" + postId + "/captions/" + captionId, updatedScore).then(res => {
      console.log(res)
      this.getPosts()
    })

  }

  downvoteCaption(captionId, postId) {
    let updatedScore = store.State.posts.find(c => c.caption._id == captionId)
    updatedScore.score--
    _postApi.put("posts/" + postId + "/captions/" + captionId, updatedScore).then(res => {
      console.log(res)
      this.getPosts()
    })

  }
  




}

const service = new PostsService();
export default service;
