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

  type WishlistedBy {
    id: ID!
    userId: ID!
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
  }

  type Chat {
    id: ID!
    lastMsg: String!
    users: [User]!
    sentAt: String!
  }

  type Message {
    id: ID!
    user: ID!
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
  type chatExists {
    _id: ID
    lastMsg: String
  }

  type Query {
    getProducts: [Product]
    getProduct(productId: ID!): Product
    getSellerProducts(userId: ID!): [Product]
    getWishlist: [Product]
    getUser(userId: ID!): User
    getUsers: [User]
    getSeller(sellerId: ID!): User
    getSellers: [User]
    getChats: [Chat]
    isChatExists(productUserId: ID!, currentUserId: ID!): [chatExists]
    getMessages(chatId: ID!): [Message]
    getProductsInCartBySeller: [Cart]
    getProductsCart: [Cart]
    getProductInCart(productId: ID!): Cart
    getCities: [City] @cacheControl(maxAge: 1000)
    getCosts(costInput: CostInput): [Results]
  }

  type Mutation {
    register(registerInput: RegisterInput): User!
    login(email: String!, password: String!): User!
    updateBuyerProfile(updateBuyerInput: UpdateBuyerInput): User!
    updateSellerProfile(updateSellerInput: UpdateSellerInput): User!
    addProduct(productInput: ProductInput): Product!
    updateProduct(productId: ID!, productInput: ProductInput): Product!
    deleteProduct(productId: ID!): Product!
    addToWishlist(productId: ID!): Product!
    addMessage(messageInput: MessageInput!): Message
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
  }
  type Subscription {
    newMessage(chatId: ID!): Message
  }
`;
