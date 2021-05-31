const { model, Schema } = require("mongoose");

const orderSchema = new Schema({
  products: [
    {
      id: String,
      name: String,
      price: Number,
      weight: Number,
      images: [{ downloadUrl: String }],
      productQty: Number,
    },
  ],
  seller: {
    username: String,
  },
  user: { type: Schema.Types.ObjectId, ref: "User" },
  logs: [
    {
      stateType: String,
      succededAt: String,
      executedAt: String,
    },
  ],
  shipping: {
    awbNumber: String,
    courierName: String,
    buyerAddress: String,
    shippingCost: String,
  },
  state: {
    stateType: String,
    createdAt: String,
    deadline: String,
  },
});

module.exports = model("Order", orderSchema);
