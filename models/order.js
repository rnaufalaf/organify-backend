const { model, Schema } = require("mongoose");

const OrderSchema = new Schema({
  products: [
    {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  orderStatus: {
    status: String,
    createdAt: String,
    deadline: String,
  },
  orderNumber: String,
  shippingCost: String,
});

module.exports = model("Order", OrderSchema);
