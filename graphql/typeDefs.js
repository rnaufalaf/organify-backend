const { gql } = require("apollo-server");

module.exports = gql`
  type Product {
    id: ID!
    name: String!
    description: String!
    price: Int!
    stock: Int!
    weight: Int!
    benefits: String!
    method: String!
    category: String!
    rating: Int!
    numReview: Int!
    user: User!
    images: [Image]!
    wishlistedBy: [WishlistedBy]
    createdAt: String!
  }

  type Order {
    id: ID!
    products: [OrderProduct]!
    seller: OrderSeller!
    user: User!
    state: OrderState
    shipping: OrderShipping
    logs: [OrderLog]!
  }

  type OrderLog {
    stateType: String!
    succededAt: String!
    executedAt: String!
  }

  type OrderSeller {
    username: String!
  }

  type OrderProduct {
    id: String!
    name: String!
    price: Int!
    weight: Int!
    images: [Image]
    productQty: Int!
  }

  type OrderState {
    stateType: String!
    createdAt: String!
    deadline: String!
  }

  type OrderShipping {
    awbNumber: String!
    courierName: String!
    buyerAddress: String!
    shippingCost: Int!
  }

  type WishlistedBy {
    id: ID
    userId: ID
    createdAt: String
  }

  type Review {
    id: ID!
    score: Int!
    body: String!
    user: User!
    product: Product!
    images: [Image]!
    createdAt: String!
  }

  type Image {
    id: ID!
    downloadUrl: String!
  }

  type User {
    id: ID!
    email: String
    phone: String
    address: Address
    balance: Int
    token: String
    buyer: Buyer
    seller: Seller
  }

  type Address {
    cityName: String
    cityId: String
    district: String
    postalCode: String
    detail: String
  }

  type Buyer {
    id: ID!
    name: String
    avatar: String
    createdAt: String
  }

  type Seller {
    id: ID!
    username: String
    avatar: String
    description: String
    createdAt: String
  }

  type Cart {
    id: ID!
    product: Product!
    productQty: Int!
    user: User!
    isChecked: Boolean!
    createdAt: String
  }

  type City {
    city_id: String
    province_id: String
    province: String
    type: String
    city_name: String
    postal_code: String
  }

  type Cost {
    value: Int
    etd: String
    note: String
  }

  type Costs {
    service: String
    description: String
    cost: [Cost]
  }

  type Results {
    code: String
    name: String
    costs: [Costs]
  }

  type MidTransResult {
    token: String
    redirect_url: String
    orderId: String
  }

  type Chat {
    id: ID!
    lastMsg: String!
    users: [User]!
    sentAt: String!
  }

  type Message {
    id: ID!
    user: User!
    product: ProductMessage
    content: String!
    images: [Image]
    sentAt: String!
  }

  type ProductMessage {
    id: ID
    name: String
    price: Int
    image: String
  }

  input CostInput {
    origin: String!
    destination: String!
    weight: Int!
    courier: String!
  }

  input ProductInput {
    name: String!
    description: String!
    price: Int!
    stock: Int!
    weight: Int!
    benefits: String!
    method: String!
    category: String!
    images: [ImageInput]!
  }

  input SearchProductInput {
    keyword: String!
    category: String
    city: String
    minPrice: Int
    maxPrice: Int
  }

  input ImageInput {
    downloadUrl: String
  }

  input CheckedCart {
    productIds: [ID]!
    isChecked: Boolean!
  }

  input RegisterInput {
    name: String!
    password: String!
    confirmPassword: String!
    email: String!
  }

  input UpdateBuyerInput {
    email: String!
    phone: String!
    address: AddressInput!
    name: String!
    avatar: String
  }

  input AddressInput {
    cityName: String
    cityId: String
    district: String
    postalCode: String
    detail: String
  }

  input UpdateSellerInput {
    username: String!
    description: String!
    avatar: String
  }

  input MessageInput {
    chatId: ID
    productMessageInput: ProductMessageInput
    recipientUserId: ID!
    content: String
    images: [ImageInput]
  }

  input ProductMessageInput {
    id: ID!
    name: String!
    price: Int!
    image: String!
  }

  input AddOrderInput {
    products: [OrderProductInput]!
    state: OrderStateInput!
    sellerUsername: String!
    shipping: OrderShippingInput!
  }

  input UpdateOrderInput {
    state: OrderStateInput!
  }

  input OrderProductInput {
    id: String!
    name: String!
    price: Int!
    weight: Int!
    images: [ImageInput]
    productQty: Int!
  }

  input OrderStateInput {
    stateType: String
  }

  input OrderShippingInput {
    awbNumber: String
    courierName: String!
    buyerAddress: String!
    shippingCost: Int!
  }

  input CreatePaymentInput {
    grossAmount: Int!
    customerDetails: CustomerDetailsInput!
    productDetails: [ProductDetail]!
  }

  input ProductDetail {
    id: String!
    price: Int!
    quantity: Int!
    name: String!
  }

  input CustomerDetailsInput {
    firstName: String!
    email: String!
    phone: String!
    billingAddress: PaymentAddressInput!
  }

  input PaymentAddressInput {
    firstName: String!
    email: String!
    phone: String!
    address: String!
    city: String!
    postalCode: String!
    countryCode: String!
  }

  input AddReviewInput {
    score: Int!
    body: String!
    images: ImageInput
    productId: ID!
  }

  type chatExists {
    _id: ID
    lastMsg: String
  }

  type Query {
    getProducts: [Product]
    getProduct(productId: ID!): Product
    getSellerProducts(userId: ID!): [Product]
    getWishlist: [Product]
    searchProducts(searchProductInput: SearchProductInput): [Product]
    getUser(userId: ID!): User
    getUsers: [User]
    getSeller(sellerId: ID!): User
    getSellers: [User]
    getProductReviews(productId: ID!): [Review]
    getUserReviews(userId: ID!): [Review]
    getChats: [Chat]
    isChatExists(productUserId: ID!, currentUserId: ID!): [chatExists]
    getMessages(chatId: ID!): [Message]
    getProductsInCartBySeller: [Cart]
    getProductsCart: [Cart]
    getProductInCart(productId: ID!): Cart
    getCheckoutData: [Cart]
    getUserOrders: [Order]
    getSellerOrders(username: String!): [Order]
    getUserOrderById(orderId: ID!): [Order]
    getCities: [City] @cacheControl(maxAge: 1000)
    getCosts(costInput: CostInput): [Results]
    createPayment(createPaymentInput: CreatePaymentInput): MidTransResult
  }

  type Mutation {
    register(registerInput: RegisterInput): User!
    login(email: String!, password: String!): User!
    updateBuyerProfile(updateBuyerInput: UpdateBuyerInput): User!
    updateSellerProfile(updateSellerInput: UpdateSellerInput): User!
    addProduct(productInput: ProductInput): Product!
    updateProduct(productId: ID!, productInput: ProductInput): Product!
    deleteProduct(productId: ID!): Product!
    addToWishlist(productId: ID!): Product
    addReview(addReviewInput: AddReviewInput): Review!
    addProductToCart(
      productId: ID!
      productQty: Int!
      isChecked: Boolean!
    ): Cart!
    editProductsInCart(
      productId: ID!
      productQty: Int!
      isChecked: Boolean!
    ): Cart!
    deleteProductFromCart(cartId: ID!): String!
    addChecklistToCart(checkedCart: CheckedCart!): String!
    addMessage(messageInput: MessageInput!): Message
    addOrder(addOrderInput: AddOrderInput!, productInCartIds: [ID]!): Order!
    addAwbNumber(
      orderId: ID!
      awbNumber: String!
      courierName: String!
      buyerAddress: String!
      shippingCost: Int!
    ): Order!
    updateOrder(orderId: ID!, updateOrderInput: UpdateOrderInput!): Order!
  }
  type Subscription {
    newMessage(chatId: ID!): Message
  }
`;
