const { model, Schema } = require("mongoose");

const ProductSchema = new Schema({
  productName: {
    type: String,
    required: true,
  },
  productDesc: {
    type: String,
    required: true,
  },
  productImage: {
    type: String,
    default: "",
  },
  productImages: [
    {
      type: String,
    },
  ],
  productPrice: {
    type: Number,
    default: 0,
    required: true,
  },
  productBenefits: {
    type: String,
    required: true,
  },
  productWeight: {
    type: Number,
    default: 0,
  },
  purchaseRules: {
    type: Number,
    default: 0,
  },
  countInStock: {
    type: Number,
    min: 0,
    max: 250,
    required: true,
  },
  rating: {
    type: Number,
    default: 0,
  },
  numReview: {
    type: Number,
    default: 0,
  },
  isFeatured: {
    type: Boolean,
    default: false,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  wishlistedBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: String,
    required: true,
  },
});

module.exports = model("Product", ProductSchema);
