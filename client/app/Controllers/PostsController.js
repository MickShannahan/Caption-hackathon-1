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
}
