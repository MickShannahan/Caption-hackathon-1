export default class Post {
    constructor(data) {
        this._id = data._id
        this.user = data.user
        this.title = data.title
        this.imgUrl = data.imgUrl
        this.score = data.score
        this.caption = data.caption || []
    }

    get Template() {
        let template = /*html*/ `

        <div class="col-9">
            <div className="row">
                <div className="col-6 image">
        
                    <style>
                        .image {
                        background-image: url('${this.imgUrl}');
                        height: 100%;
                        }  
                    </style>
                    
                </div>

                <div className="col-6">
                    <h3><span>${this.title}</span><span>${this.user}</span><h3>
                    <div class="card" style="width: 18rem;">
                    <ul class="list-group list-group-flush">
                        `

        this.caption.forEach(c => template += `<li class="list-group-item">${this.caption[c].caption}</li>`)


        template += /*html*/ `
                    </ul>
                    </div>
                </div>
            </div>
        </div >
            `

        return template

    }
}