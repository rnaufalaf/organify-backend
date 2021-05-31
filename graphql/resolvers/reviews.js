const { UserInputError, AuthenticationError } = require("apollo-server");

const Review = require("../../models/Review");
const checkAuth = require("../../util/checkAuth");

module.exports = {
  Mutation: {
    async addReview(
      _,
      { addReviewInput: { score, body, images, productId } },
      context
    ) {
      const user = checkAuth(context);
      const newReview = new Review({
        score: score,
        body: body,
        user: user.id,
        images: images,
        product: productId,
        createdAt: new Date().toISOString(),
      });
      const review = await newReview.save();
      return review;
    },
  },
  Query: {
    async getProductReviews(_, { productId }) {
      try {
        const reviews = await Review.find({ product: productId })
          .sort({ createdAt: -1 })
          .populate("user")
          .populate("product");
        return reviews;
      } catch (err) {
        throw new Error(err);
      }
    },

    async getUserReviews(_, { userId }) {
      try {
        const reviews = await Review.find({ user: userId })
          .sort({ createdAt: -1 })
          .populate("user")
          .populate("product");
        return reviews;
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};
