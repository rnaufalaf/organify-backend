module.exports = {
  Query: {
    getCities: async (_, __, { dataSources }) =>
      dataSources.rajaOngkirApi.getCities(),

    getCosts: async (_, { costInput }, { dataSources }) =>
      dataSources.rajaOngkirApi.getCosts(costInput),
  },
};
