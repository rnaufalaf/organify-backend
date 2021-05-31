const productResolvers = require("./products");
const userResolvers = require("./users");
const cartResolvers = require("./carts");
const citiesResolvers = require("./cities");
const messagesResolvers = require("./messages");
const chatsResolvers = require("./chats");
const reviewsResolvers = require("./reviews");
const ordersResolvers = require("./orders");
const paymentsResolvers = require("./payments");

module.exports = {
  Query: {
    ...productResolvers.Query,
    ...userResolvers.Query,
    ...cartResolvers.Query,
    ...citiesResolvers.Query,
    ...chatsResolvers.Query,
    ...messagesResolvers.Query,
    ...reviewsResolvers.Query,
    ...ordersResolvers.Query,
    ...paymentsResolvers.Query,
  },
  Mutation: {
    ...userResolvers.Mutation,
    ...productResolvers.Mutation,
    ...cartResolvers.Mutation,
    ...messagesResolvers.Mutation,
    ...reviewsResolvers.Mutation,
    ...ordersResolvers.Mutation,
  },
};
