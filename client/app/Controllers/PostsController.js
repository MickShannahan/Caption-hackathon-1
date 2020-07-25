import PostsService from "../Services/PostsService.js";
import store from "../store.js";


//Private
function _drawPosts() {
  let template = ""
  store.State.posts.forEach(p => template += p.Template)
  document.getElementById("posts").innerHTML = template
  document.getElementById("enterUserName").setAttribute("value", store.State.user.username)
}

//Public
export default class PostsController {
  constructor() {
    store.subscribe("posts", _drawPosts);
  }

  // toggleCollapse(target) {
  //   $(target).collapse("toggle")
  // }
  addUser(event) {
    event.preventDefault()
    let rawUser = {
      username: event.target.username.value
    }
    PostsService.addUser(rawUser)
  }
  createPost(event) {
    event.preventDefault()
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

  upVoteCaption(postId, captionId) {
    PostsService.upVoteCaption(postId, captionId)
  }

  downVoteCaption(postId, captionId) {
    PostsService.downVoteCaption(postId, captionId)
  }

}
