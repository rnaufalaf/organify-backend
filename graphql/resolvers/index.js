const productResolvers = require("./products");
const userResolvers = require("./users");
const cartResolvers = require("./carts");
const citiesResolvers = require("./cities");

module.exports = {
  Query: {
    ...productResolvers.Query,
    ...userResolvers.Query,
    ...cartResolvers.Query,
    ...citiesResolvers.Query,
  },
  Mutation: {
    ...userResolvers.Mutation,
    ...productResolvers.Mutation,
    ...cartResolvers.Mutation,
  },
};
