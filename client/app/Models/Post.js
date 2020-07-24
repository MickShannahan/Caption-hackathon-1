export default class Value {
    constructor(data) {
        this.id = data.id
        this.title = data.title
        this.username = data.username
        this.title = data.title
        this.imgUrl = data.imgUrl
        this.caption = data.caption
        this.score = data.score
    }

    get Template() {
        return this.title
    }
}