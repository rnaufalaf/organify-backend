const productResolvers = require("./products");
const userResolvers = require("./users");
const cartResolvers = require("./carts");
const citiesResolvers = require("./cities");
const messagesResolvers = require("./messages");
const chatsResolvers = require("./chats");
const reviewsResolvers = require("./reviews");

module.exports = {
  Query: {
    ...productResolvers.Query,
    ...userResolvers.Query,
    ...cartResolvers.Query,
    ...citiesResolvers.Query,
    ...chatsResolvers.Query,
    ...messagesResolvers.Query,
  },
  Mutation: {
    ...userResolvers.Mutation,
    ...productResolvers.Mutation,
    ...cartResolvers.Mutation,
    ...messagesResolvers.Mutation,
  },
};
