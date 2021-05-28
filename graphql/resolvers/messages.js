const {
  UserInputError,
  AuthenticationError,
  withFilter,
} = require("apollo-server");

const Chat = require("../../models/chat");
const Message = require("../../models/message");
const checkAuth = require("../../util/checkAuth");

module.exports = {
  Query: {
    async getMessages(_, { chatId }) {
      try {
        const messages = await Message.find({ chatId: chatId })
          .sort({
            createdAt: -1,
          })
          .populate("user");
        return messages;
      } catch (err) {
        throw new Error(err);
      }
    },
  },

  Mutation: {
    addMessage: async (
      _,
      {
        messageInput: {
          chatId,
          recipientUserId,
          content,
          images,
          productMessageInput,
        },
      },
      context
    ) => {
      if (!images) {
        images = [];
      }
      try {
        const { id: userId } = checkAuth(context);
        const newMessage = new Message({
          user: userId,
          content: content,
          images: images,
          sentAt: new Date().toISOString(),
        });
        if (productMessageInput) {
          newMessage.product = {
            id: productMessageInput.id,
            name: productMessageInput.name,
            price: productMessageInput.price,
            image: productMessageInput.image,
          };
        }
        if (!chatId || chatId === "") {
          const newChat = new Chat({
            lastMsg: content,
            users: [recipientUserId, userId],
            sentAt: new Date().toISOString(),
          });
          newChat.save(function (err, chatDoc) {
            newMessage.chatId = chatDoc._id;
            if (err) {
              throw new Error(err);
            } else {
              newMessage.save();
            }
          });
          return newMessage.save();
        }
        context.pubsub.publish("NEW_MESSAGE", { newMessage: newMessage });
        return newMessage;
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  Subscription: {
    newMessage: {
      newMessage: {
        subscribe: withFilter(
          (_, __, { pubsub, user }) => {
            console.log(user);
            if (!user) throw new AuthenticationError("Unauthenticated");
            return pubsub.asyncIterator("NEW_MESSAGE");
          },
          ({ newMessage }, { chatId }, { user }) => {
            //   console.log("new message user id: ",typeof(newMessage.user.toString()))
            //   console.log("current user id: ",typeof(user.id))
            //   console.log("is id same: ", (newMessage.user.toString() === user.id))
            //   console.log("chatId: ", chatId)
            if (newMessage.chatId.toString() === chatId) {
              console.log("there's a new chat");
              return true;
            }
            return false;
          }
        ),
      },
    },
  },
};
