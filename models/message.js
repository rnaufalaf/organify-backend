const { model, Schema } = require("mongoose");

const MessageSchema = new Schema({
  chatId: {
    type: Schema.Types.ObjectId,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  product: {
    id: {
      type: Schema.Types.ObjectId,
    },
    name: String,
    price: Number,
    image: String,
  },
  content: String,
  images: [
    {
      downloadUrl: String,
    },
  ],
  sentAt: String,
});

module.exports = model("Message", MessageSchema);
