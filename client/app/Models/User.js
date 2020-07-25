export default class User {
  constructor(data) {
    this.username = data.username
    this.favorites = data.favorites || []
    this.captionsVoted = data.captionsVoted || []
  }
}