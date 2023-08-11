class UserOrder{
    constructor(order, user){
        this._id = order._id;
        this.review = order.review;
        this.rating = order.rating;
        this.user = user;
    }
}

module.exports = UserOrder;