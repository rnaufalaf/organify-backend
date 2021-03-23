const productResolvers = require("./product");
const userResolvers = require("./user");
const cartResolvers = require("./cart");

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
