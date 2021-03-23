const { model, Schema } = require("mongoose");

const ReviewSchema = new Schema({
  rating: Number,
  body: String,
  product: {
    type: Schema.Types.ObjectId,
    ref: "Product",
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  images: [
    {
      imagesUrl: String,
    },
  ],
  createdAt: String,
});

module.exports = model("Review", ReviewSchema);
