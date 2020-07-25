export default class Post {
    constructor(data) {
        this._id = data._id
        this.user = data.user
        this.title = data.title
        this.imgUrl = data.imgUrl
        this.score = data.score || 0
        this.caption = data.caption || []
    }

    get Template() {

        let template = /*html*/`
    
                <div class="row roudned rounded-big post-size my-3">
                    <div id="${this._id}-picture" class="col-6 img img-fluid">
                        <div class="row">
                            caption styling goes here
                        </div>
                    </div>
                    <div class="col-6 ">
                        <div class="row h-100 align-content-start">
                            <div class="col-12 bg-primary text-white">
                                username + title
                            </div>
                            <div class="col-12 bg-light">
                                <div id="${this._id}" class="row my-1 pl-4">
                                `

        this.caption.forEach(c => template += /*html*/`
                                    <div class="col-2  btn btn-outline-success" onclick="app.postsController.upVoteCaption('${this._id}, ${c._id}')">up
                                    </div>
                                    <div class="col-8 d-flex align-self-center">${c.caption}</div>
                                    <div class="col-2  btn btn-outline-danger" onclick="app.postsController.downVoteCaption('${this._id}, ${c._id}')">down
                                    </div>`
        )

        template += /*html*/`

                                </div>
                            </div>
                            <!-- Caption Button -->

                            <div class="col-12 btn btn-primary btn-bottom text-center mt-auto" data-toggle="collapse"
                                data-target="${this._id}-collapse">
                                caption it</div>

                        </div>
                    </div>
                    <!--\/ CREATE A CAPTION SPACE \/ -->
                    <div id="${this._id}-collapse" class="col-12 bg-secondary collapse">
                        <div class="row">
                            <div class="col-4 p-4"> <img src="https://scx2.b-cdn.net/gfx/news/2018/europeslostf.jpg"
                                    alt="post image" class="img img-fluid"></div>
                            <div class="col-8">
                                <div class="row form-group justify-content-between py-3 px-5"
                                    onsubmit="app.postsController.createCaption(event,'${this._id}')">
                                    <input name="caption" class="col-12 form-control my-3"
                                        placeholder="enter you caption...">
                                    <div class="col-6">
                                        <select id="inputState" name="style" class="form-control">
                                            <option selected>Choose Style...</option>
                                            <option>style one</option>
                                            <option>style two</option>
                                            <option>style three</option>
                                        </select>
                                    </div>
                                    <button class="col-4 btn btn-warning" type="submit">Post</button>

                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- /\ CREATE A CAPTION END /\ -->
                </div>
            `

        return template

    }
}
