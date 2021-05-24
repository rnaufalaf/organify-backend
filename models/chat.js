const { model, Schema } = require("mongoose");

const ChatSchema = new Schema({
  lastMsg: String,
  users: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  sentAt: String,
});

module.exports = model("Chat", ChatSchema);
