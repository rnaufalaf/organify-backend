const productResolvers = require("./products");
const userResolvers = require("./users");
const cartResolvers = require("./carts");

module.exports = {
  Query: {
    ...productResolvers.Query,
    ...userResolvers.Query,
    ...cartResolvers.Query,
  },
  Mutation: {
    ...userResolvers.Mutation,
    ...productResolvers.Mutation,
    ...cartResolvers.Mutation,
  },
};
