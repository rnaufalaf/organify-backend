const { gql } = require("apollo-server");

module.exports = gql`
  type Product {
    id: ID!
    productName: String!
    productDesc: String!
    productImage: String
    productImages: [String]
    productPrice: Int!
    productBenefits: String!
    productWeight: Int!
    purchaseRules: Int!
    countInStock: Int!
    rating: Int
    numReview: Int
    isFeatured: Boolean
    category: String!
    user: User!
    createdAt: String!
  }

  type Buyer {
    buyerId: ID!
    username: String!
    avatar: String
    createdAt: String
  }
  type Seller {
    sellerId: ID!
    sellerName: String!
    sellerDesc: String!
    sellerAvatar: String
    createdAt: String!
    balance: Int
  }

  type User {
    id: ID!
    email: String!
    phone: String
    address: String!
    password: String!
    token: String!
    buyer: Buyer!
    seller: Seller!
  }

  type Cart {
    id: ID!
    product: Product!
    productQty: Int!
    user: User!
  }

  input ProductInput {
    productName: String!
    productDesc: String!
    productImage: String
    productImages: [String]
    productPrice: Int!
    productBenefits: String!
    productWeight: Int!
    purchaseRules: Int!
    countInStock: Int!
    category: String!
    rating: Int
    numReview: Int
    isFeatured: Boolean
  }

  input RegisterInput {
    username: String!
    password: String!
    confirmPassword: String!
    email: String!
  }

  input UpdateUserInput {
    email: String!
    password: String
    phone: String!
    address: String!
    username: String!
    avatar: String
  }

  input UpdateSellerInput {
    sellerName: String!
    sellerDesc: String!
    sellerAvatar: String
  }

  type Query {
    getProducts: [Product]
    getProduct(productId: ID!): Product
    getSeller(sellerId: ID!): Seller
    getUsers: [User]
    getUser(userId: ID!): User
    getAllProductsinCart: [Cart]
    getSingleProductinCart(productId: ID!): Cart
  }

  type Mutation {
    register(registerInput: RegisterInput): User!
    login(email: String!, password: String!): User!
    updateUserProfile(updateUserInput: UpdateUserInput): User!
    updateSellerProfile(updateSellerInput: UpdateSellerInput): User!
    addProduct(productInput: ProductInput): Product!
    deleteProduct(productId: ID!): Product!
    addProductToCart(productId: ID!, productQty: Int!): Cart!
    clearProductFromCart(cartId: ID!): String!
  }
`;
