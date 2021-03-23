const Product = require("../../models/product");
const checkAuth = require("../../util/checkAuth");
const { validateProductInput } = require("../../util/validator");
module.exports = {
  Mutation: {
    async addProduct(
      _,
      {
        productInput: {
          productName,
          productDesc,
          productImage,
          productImages,
          productPrice,
          productBenefits,
          productWeight,
          purchaseRules,
          countInStock,
          isFeatured,
          category,
        },
      },
      context
    ) {
      const user = checkAuth(context);

      const { valid, errors } = validateProductInput(
        productName,
        productDesc,
        productPrice,
        productBenefits,
        productImage,
        productImages,
        productWeight,
        purchaseRules,
        countInStock,
        category
      );
      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }
      const newProduct = new Product({
        productName: productName,
        productDesc: productDesc,
        productImage: productImage,
        productImages: productImages,
        productPrice: productPrice,
        productBenefits: productBenefits,
        productWeight: productWeight,
        purchaseRules: purchaseRules,
        countInStock: countInStock,
        category: category,
        isFeatured,
        user: user.id,
        createdAt: new Date().toISOString(),
      });
      const product = await newProduct.save();

      return product;
    },
  },
  async deleteProduct(_, { productId }, context) {
    const user = checkAuth(context);

    try {
      const product = await Product.findById(productId);
      if (user.sellerName === product.user) {
        await product.delete();
        return "Product deleted succesfully";
      } else {
        return new AuthenticationError("Action not allowed");
      }
    } catch (err) {
      throw new Error(err);
    }
  },
  async updateProduct(
    _,
    {
      productId,
      productInput: {
        productName,
        productDesc,
        productPrice,
        productBenefits,
        productImage,
        productImages,
        productWeight,
        purchaseRules,
        countInStock,
      },
    },
    context
  ) {
    const { valid, errors } = validateProductInput(
      productName,
      productDesc,
      productPrice,
      productBenefits,
      productImage,
      productImages,
      productWeight,
      purchaseRules,
      countInStock
    );

    if (!valid) {
      throw new UserInputError("Errors", { errors });
    }

    const updatedProduct = await Product.findOneAndUpdate(
      { _id: productId },
      {
        productName: productName,
        productDesc: productDesc,
        productPrice: productPrice,
        productBenefits: productBenefits,
        productImage: productImage,
        productImages: productImages,
        productWeight: productWeight,
        purchaseRules: purchaseRules,
        countInStock: countInStock,
      },
      { new: true }
    );

    return {
      ...updatedProduct._doc,
      id: updatedProduct._id,
    };
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
        const products = await Product.find();
        return products;
      } catch (err) {
        throw new Error(err);
      }
    },
    async getProduct(_, { productId }) {
      try {
        const product = await Product.findById(productId);
        if (product) {
          return product;
        } else {
          throw new error("Product not found");
        }
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};
