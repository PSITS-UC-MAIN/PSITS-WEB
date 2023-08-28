class UserOrder {
  constructor(order, user) {
    this._id = order._id;
    this.review = order.review;
    this.rating = order.rating;
    this.user = user;
  }
}

export default UserOrder;
