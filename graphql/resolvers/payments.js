// const checkAuth = require("../../util/check-auth");

module.exports = {
  Query: {
    createPayment: async (_, { createPaymentInput }, { dataSources }) => {
      const timeStamp = "" + Math.round(new Date().getTime() / 1000);
      const orderId = "order-org-" + timeStamp
      createPaymentInput = {
        ...createPaymentInput,
        orderId: orderId
      }
      let result = await dataSources.midTransApi.createPayment(createPaymentInput)
      return {
        ...result,
        orderId: orderId
      }
    }
  },
};
