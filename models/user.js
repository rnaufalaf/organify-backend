const { model, Schema } = require("mongoose");

const userSchema = new Schema({
  email: String,
  password: String,
  phone: String,
  address: String,
  buyer: {
    buyerId: {
      type: Schema.Types.ObjectId,
      auto: true,
    },
    username: String,
    avatar: String,
    createdAt: String,
  },
  seller: {
    sellerId: {
      type: Schema.Types.ObjectId,
      auto: true,
    },
    sellerName: String,
    sellerAvatar: String,
    sellerDesc: String,
    createdAt: String,
    balance: Number,
  },
});

module.exports = model("User", userSchema);
