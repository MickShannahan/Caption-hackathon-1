import store from "../store.js";


const _postApi = axios.create({
  baseURL: "http://localhost:3000/api/",
  timeout: 3000
})


class PostsService {
  constructor() {

  }


  getPosts() {
    _postApi.get("posts").then(res => {
      console.log(res.data)
      store.commit()
    })
  }



}

const service = new PostsService();
export default service;
