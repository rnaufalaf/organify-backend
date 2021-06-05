const { RESTDataSource } = require("apollo-datasource-rest");

let getCurrentTimestamp = () => {
  return "" + Math.round(new Date().getTime() / 1000);
};

class MidTransApi extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "https://app.sandbox.midtrans.com/snap/v1/";
  }

  willSendRequest(request) {
    request.headers.set(
      "Authorization",
      "Basic " +
        Buffer.from("SB-Mid-server-A2YHePFC9ZXOvzNUz3Rc1sQm").toString("base64")
    );
  }

  async createPayment(createPaymentInput) {
    const data = await this.post(`transactions`, {
      transaction_details: {
        order_id: createPaymentInput.orderId,
        gross_amount: createPaymentInput.grossAmount,
      },
      credit_card: {
        secure: true,
      },
      product_details: createPaymentInput.productDetails,
      customer_details: {
        first_name: createPaymentInput.customerDetails.firstName,
        last_name: "",
        email: createPaymentInput.customerDetails.email,
        phone: createPaymentInput.customerDetails.phone,
        billing_address: {
          first_name:
            createPaymentInput.customerDetails.billingAddress.firstName,
          last_name: "",
          email: createPaymentInput.customerDetails.billingAddress.email,
          phone: createPaymentInput.customerDetails.billingAddress.phone,
          address: createPaymentInput.customerDetails.billingAddress.address,
          city: createPaymentInput.customerDetails.billingAddress.city,
          postal_code:
            createPaymentInput.customerDetails.billingAddress.postalCode,
          country_code:
            createPaymentInput.customerDetails.billingAddress.countryCode,
        },
      },
    });
    return data;
  }
}

module.exports = {
  MidTransApi,
};
