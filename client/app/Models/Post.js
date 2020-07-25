let styleOne = 'blackNwhite'



export default class Post {
    constructor(data) {
        this._id = data._id
        this.username = data.username
        this.title = data.title
        this.imgUrl = data.imgUrl
        this.score = data.score || 0
        this.caption = data.caption || []
    }

    get Template() {

        let sortedArr = this.caption.sort((a, b) => b.score - a.score)

        // debugger
        let template = /*html*/`
    
                <div class="row rounded rounded-big post-size my-3">
                    <div id="picture-${this._id}" class="col-6 img-fluid">
                        <style>
                            #picture-${this._id} {
                            background-image: url(${this.imgUrl});
                            min-height: 100%;
                            background-size: cover;
                            background-repeat: no-repeat;
                            background-position: center;
                         }
                        </style>

                        <div class="row text-white text-center">`

        if (this.caption[0]) {
            template += `<div class=" ${this.caption[0].style}">${this.caption[0].caption}</div>`
        }

        template += /*html*/`   
                        </div>
                    </div>
                    <div class="col-6 ">
                        <div class="row h-100 align-content-start">
                            <div class="col-12 bg-primary text-white">
                                ${this.username} + ${this.title}
                            </div>
                            <div class="col-12 bg-light">
                                <div id="${this._id}" class="row my-1 pl-4">
                                `

        sortedArr.forEach(c => template += /*html*/`
                                    <div class="col-2  btn btn-outline-success" onclick="app.postsController.upVoteCaption('${this._id}', '${c._id}')">up
                                    </div>
                                    <div class="col-8 d-flex align-self-center">${c.score} ${c.caption}</div>
                                    <div class="col-2  btn btn-outline-danger" onclick="app.postsController.downVoteCaption('${this._id}', '${c._id}')">down
                                    </div>`
        )

        template += /*html*/`

                                </div>
                            </div>
                            <!-- Caption Button -->

                            <div class="col-12 btn btn-primary btn-bottom text-center mt-auto" data-toggle="collapse"
                                data-target="#collapse-${this._id}">
                                caption it</div>

                        </div>
                    </div>
                    <!--\/ CREATE A CAPTION SPACE \/ -->
                    <div id="collapse-${this._id}" class="col-12 bg-secondary collapse">
                        <div class="row">
                            <div class="col-4 p-4"> <img src="${this.imgUrl}"
                                    alt="post image" class="img img-fluid"></div>
                            <div class="col-8">
                                <form onsubmit="app.postsController.createCaption(event,'${this._id}')">
                                <div class="row form-group justify-content-between py-3 px-5">
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
                                </form> 
                            </div>
                        </div>
                    </div>
                    <!-- /\ CREATE A CAPTION END /\ -->
                </div>
            `

        return template

    }
}
