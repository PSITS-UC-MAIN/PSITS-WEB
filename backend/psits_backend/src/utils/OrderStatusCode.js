const OrderStatusCode =  {
    ORDERED: "ORDERED",
    CANCELLED: "CANCELLED",
    PAID: "PAID",
    REVIEWED: "REVIEWED",
    INVALID: "INVALID",
    getStatusCode(status){
        switch(status){
            case "ORDERED":
                return OrderStatusCode.ORDERED;
            case "CANCELLED":
                return OrderStatusCode.CANCELLED;
            case "PAID":
                return OrderStatusCode.PAID;
            case "REVIEWED":
                return OrderStatusCode.REVIEWED;
            default:
                return OrderStatusCode.INVALID;
        }
    }
}
module.exports = OrderStatusCode;