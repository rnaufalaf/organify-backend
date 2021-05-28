const { UserInputError, AuthenticationError } = require("apollo-server");
const { ObjectId } = require("mongodb");
const Chat = require("../../models/chat");
const Message = require("../../models/message");
const checkAuth = require("../../util/checkAuth");

module.exports = {
  Query: {
    async getChats(_, {}, context) {
      const { id: userId } = checkAuth(context);
      try {
        const chats = await Chat.find({ users: userId })
          .sort({ createdAt: -1 })
          .populate("users");
        return chats;
      } catch (err) {
        throw new Error(err);
      }
    },
    async isChatExists(_, { productUserId, currentUserId }, context) {
      try {
        const chats = await Chat.aggregate([
          {
            $match: {
              users: {
                $all: [
                  new ObjectId(currentUserId),
                  new ObjectId(productUserId),
                ],
              },
            },
          },
        ]);
        return chats;
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};
