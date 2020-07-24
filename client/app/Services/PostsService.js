import store from "../store.js";
import Post from "../Models/Post.js"


// @ts-ignore
const _postApi = axios.create({
  baseURL: "http://localhost:3000/api/",
  timeout: 3000
})


class PostsService {
  constructor() {
    this.getPosts()

  }


  getPosts() {
    _postApi.get("posts").then(res => {
      console.log(res.data)
      store.commit("posts", res.data.map(rawPostData => new Post(rawPostData)))
    }).catch(err => console.error(err))
  }



}

const service = new PostsService();
export default service;
