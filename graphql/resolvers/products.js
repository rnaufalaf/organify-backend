const Product = require("../../models/product");
const checkAuth = require("../../util/checkAuth");
const { validateProductInput } = require("../../util/validator");
module.exports = {
  Mutation: {
    async addProduct(
      _,
      {
        productInput: {
          name,
          description,
          benefits,
          method,
          category,
          price,
          weight,
          stock,
          images,
        },
      },
      context
    ) {
      const user = checkAuth(context);

      const { valid, errors } = validateProductInput(
        name,
        description,
        method,
        category,
        benefits,
        price,
        weight,
        stock
      );
      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }
      const newProduct = new Product({
        name: name,
        description: description,
        benefits: benefits,
        method: method,
        category: category,
        price: price,
        weight: weight,
        stock: stock,
        user: user.id,
        rating: 0,
        numReview: 0,
        images: images,
        createdAt: new Date().toISOString(),
      });
      const product = await newProduct.save();

      return product;
    },
  },

  async updateProduct(
    _,
    {
      productId,
      productInput: {
        name,
        description,
        benefits,
        method,
        category,
        price,
        weight,
        stock,
        images,
      },
    },
    context
  ) {
    const user = checkAuth(context);
    const { valid, errors } = validateProductInput(
      name,
      description,
      benefits,
      method,
      category,
      price,
      weight,
      stock
    );
    if (!valid) {
      throw new UserInputError("Errors", { errors });
    }

    const updatedProduct = await Product.findOneAndUpdate(
      { _id: productId },
      {
        name: name,
        description: description,
        benefits: benefits,
        method: method,
        category: category,
        price: price,
        weight: weight,
        stock: stock,
        user: user.id,
        rating: 0,
        numReview: 0,
        images: images,
      },
      { new: true }
    ).populate("user");

    return {
      ...updatedProduct._doc,
      id: updatedProduct._id,
    };
  },

  async deleteProduct(_, { productId }, context) {
    const user = checkAuth(context);

    try {
      const product = await Product.findById(productId);
      if (user.username === product.user) {
        await product.delete();
        return "Product deleted succesfully";
      } else {
        return new AuthenticationError("Action not allowed");
      }
    } catch (err) {
      throw new Error(err);
    }
  },
  async addToWishlist(_, { productId }, context) {
    const { id } = checkAuth(context);

    const product = await Product.findById(productId);

    if (product) {
      if (
        product.wishlistedBy.find(
          (wishlist) => wishlist.userId.toString() === id
        )
      ) {
        product.wishlistedBy = product.wishlistedBy.filter(
          (wishlist) => wishlist.userId.toString() !== id
        );
      } else {
        product.wishlistedBy.push({
          userId: id,
          createdAt: new Date().toISOString(),
        });
      }
      await product.save();
      return product;
    } else {
      throw new UserInputError("Product not found");
    }
  },
  Query: {
    async getProducts() {
      try {
        const products = await Product.find()
          .sort({ createdAt: -1 })
          .populate("user");
        return products;
      } catch (err) {
        throw new Error(err);
      }
    },
    async getProduct(_, { productId }) {
      try {
        const product = await Product.findById(productId).populate("user");
        if (product) {
          return product;
        } else {
          throw new error("Product not found");
        }
      } catch (err) {
        throw new Error(err);
      }
    },
    async getSellerProducts(_, { userId }) {
      try {
        const products = await Product.find({ user: userId })
          .sort({ createdAt: -1 })
          .populate("user");
        return products;
      } catch (err) {
        throw new Error(err);
      }
    },

    async getWishlist(_, {}, context) {
      try {
        const user = checkAuth(context);
        const products = await Product.find({
          wishlistedBy: {
            $elemMatch: {
              userId: user.id,
            },
          },
        })
          .sort({ createdAt: -1 })
          .populate("user");
        return products;
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};
