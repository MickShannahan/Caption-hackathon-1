import store from "../store.js";
import Post from "../Models/Post.js"
import User from "../Models/User.js";


// @ts-ignore
const _postApi = axios.create({
  baseURL: "//localhost:3000/api",
  timeout: 3000
})


class PostsService {
  constructor() {
    this.getPosts()

  }

  addUser(rawUser) {
    store.commit('user', new User(rawUser))
  }

  createPost(rawPostData) {
    _postApi.post("posts/", new Post(rawPostData)).then(res => {
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

  upVoteCaption(postId, captionId) {
    let post = store.State.posts.find(p => p._id == postId)
    if (!post) {
      console.error("invalid post ID")
    }

    let updatedScore = post.caption.find(c => c._id == captionId)
    if (updatedScore) {
      let userVote = store.State.user.captionsVoted.find(c => c == captionId)
      if (userVote != updatedScore._id) {
        updatedScore.score++
        store.State.user.captionsVoted.push(captionId)
        _postApi.put("posts/" + postId + "/captions/" + captionId, updatedScore).then(res => {
          console.log(res)
          this.getPosts()
          store.saveState()
        })
      }
    }
  }



  downVoteCaption(postId, captionId) {
    let post = store.State.posts.find(p => p._id == postId)
    if (!post) {
      console.error("invalid post ID")
    }
    let updatedScore = post.caption.find(c => c._id == captionId)
    if (updatedScore) {
      let userVote = store.State.user.captionsVoted.find(c => c == captionId)
      if (userVote != updatedScore._id) {
        updatedScore.score--
        store.State.user.captionsVoted.push(captionId)
        _postApi.put("posts/" + postId + "/captions/" + captionId, updatedScore).then(res => {
          console.log(res)
          this.getPosts()
        })
      }
    }
  }





}

const service = new PostsService();
export default service;
