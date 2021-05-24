const { ApolloServer, PubSub } = require("apollo-server");
const mongoose = require("mongoose");

const checkAuthSubscription = require("./util/checkAuthSubscription");
const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers/index");
const { MONGODB } = require("./config");
const {
  RajaOngkirApi,
} = require("./graphql/resolvers/datasource/RajaOngkirApi");

const PORT = process.env.PORT || 1000;
const pubsub = new PubSub();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => {
    return {
      rajaOngkirApi: new RajaOngkirApi(),
    };
  },
  context: (context) => {
    const user = checkAuthSubscription(context);
    const req = context.req;
    return { req, pubsub, user };
  },
});

mongoose
  .connect(MONGODB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB Connected");
    return server.listen(PORT);
  })
  .then((res) => {
    console.log(`Server running at ${res.url}`);
  })
  .catch((err) => {
    console.error(err);
  });
