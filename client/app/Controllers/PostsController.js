import PostsService from "../Services/PostsService.js";
import store from "../store.js";
import Post from "../Models/Post.js";

//Private
function _drawPosts() {
  let template = ""
  store.State.posts.forEach(p => template += p.Template)
  document.getElementById("posts").innerHTML = template



}

//Public
export default class PostsController {
  constructor() {
    store.subscribe("posts", _drawPosts);
  }

  createPost(event) {
    event.preventDefault()
    debugger;
    let rawPostData = {
      username: event.target.username.value,
      title: event.target.title.value,
      imgUrl: event.target.imgUrl.value,
    }
    PostsService.createPost(rawPostData)

    event.target.reset()
  }

  createCaption(event, postId) {
    event.preventDefault()
    let rawCaptionData = {
      caption: event.target.caption.value,
      style: event.target.style.value
    }
    PostsService.createCaption(rawCaptionData, postId)
  event.target.reset()
  }
}
