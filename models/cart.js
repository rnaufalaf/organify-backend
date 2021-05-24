const { model, Schema } = require("mongoose");

// Comment

const CartSchema = new Schema(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
    productQty: {
      type: Number,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    isChecked: {
      type: Boolean,
      required: true,
    },
    createdAt: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = model("Cart", CartSchema);
