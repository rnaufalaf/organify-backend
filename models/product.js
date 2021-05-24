const { model, Schema } = require("mongoose");

const ProductSchema = new Schema({
  name: String,
  description: String,
  price: Number,
  stock: Number,
  weight: Number,
  benefits: String,
  method: String,
  category: String,
  rating: Number,
  numReview: Number,
  images: [
    {
      downloadUrl: String,
    },
  ],
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  wishlistedBy: [
    {
      userId: { type: Schema.Types.ObjectId },
      createdAt: String,
    },
  ],
  createdAt: String,
});

module.exports = model("Product", ProductSchema);
