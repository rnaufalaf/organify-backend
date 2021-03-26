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
    email: String!
    phone: String!
    address: Address!
    balance: Int!
    token: String!
    buyer: Buyer!
    seller: Seller!
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
    birthDate: String
    avatar: String
    createdAt: String
  }

  type Seller {
    id: ID!
    username: String!
    avatar: String!
    description: String!
    createdAt: String!
  }

  type Cart {
    id: ID!
    product: Product!
    productQty: Int!
    user: User!
  }

  input ProductInput {
    name: String!
    description: String!
    price: Int!
    stock: Int!
    weight: Int!
    benefits: String!
    category: String!
    images: [ImageInput]!
  }

  input ImageInput {
    downloadUrl: String
  }

  input RegisterInput {
    name: String!
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
    getSellerProducts(userId: ID!): [Product]
    getWishlist: [Product]
    getUser(userId: ID!): User
    getUsers: [User]
    getSeller(sellerId: ID!): User
    getSellers: [User]
    getAllProductsinCart: [Cart]
    getSingleProductinCart(productId: ID!): Cart
  }

  type Mutation {
    register(registerInput: RegisterInput): User!
    login(email: String!, password: String!): User!
    updateUserProfile(updateUserInput: UpdateUserInput): User!
    updateSellerProfile(updateSellerInput: UpdateSellerInput): User!
    addProduct(productInput: ProductInput): Product!
    updateProduct(productId: ID!, productInput: ProductInput): Product!
    deleteProduct(productId: ID!): Product!
    addToWishlist(productId: ID!): Product!
    addProductToCart(productId: ID!, productQty: Int!): Cart!
    clearProductFromCart(cartId: ID!): String!
  }
`;
