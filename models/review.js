const { model, Schema } = require("mongoose");

const reviewSchema = new Schema({
  score: Number,
  body: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  product: {
    type: Schema.Types.ObjectId,
    ref: "Product",
  },
  images: [
    {
      downloadUrl: String,
    },
  ],
  createdAt: String,
});

module.exports = model("Review", reviewSchema);
