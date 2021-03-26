const { AuthenticationError, UserInputError } = require("apollo-server");

const Cart = require("../../models/cart");
const checkAuth = require("../../util/checkAuth");
const { validateCartInput } = require("../../util/validator");

module.exports = {
  Query: {
    async getAllProductsinCart(_, __, context) {
      try {
        const user = checkAuth(context);
        const cart = await Cart.find({ user: user.id })
          .populate("user")
          .populate({
            path: "product",
            populate: {
              path: "user",
              options: { sort: { "seller.sellerName": -1 } },
            },
          });
        if (cart) {
          return cart;
        } else {
          throw new Error("Cart items not found");
        }
      } catch (err) {
        throw new Error(err);
      }
    },
    async getSingleProductinCart(_, { productId }, context) {
      try {
        const user = checkAuth(context);
        const cart = await Cart.findOne({ product: productId, user: user.id })
          .populate("user")
          .populate({
            path: "product",
            populate: {
              path: "user",
              options: { sort: { "seller.sellerName": -1 } },
            },
          });
        if (cart) {
          return cart;
        } else {
          throw new Error("Product not found");
        }
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  Mutation: {
    async addProductToCart(_, { productId, productQty }, context) {
      const user = checkAuth(context);

      const { valid, errors } = validateCartInput(productQty);

      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }

      const productInCart = await Cart.findOne({
        product: productId,
        user: user.id,
      });

      if (productInCart) {
        productInCart.productQty += productQty;
        const updatedCart = await productInCart.save();
        return updatedCart;
      } else {
        const newCart = new Cart({
          product: productId,
          user: user.id,
          productQty: productQty,
          createdAt: new Date().toISOString(),
        });

        const cart = await newCart.save();
        return cart;
      }
    },
    async clearProductFromCart(_, { cartId }, context) {
      try {
        const user = checkAuth(context);
        const ProductInCart = await Cart.findById(cartId);
        if (ProductInCart) {
          await ProductInCart.delete();
          return "Product deleted from cart";
        }
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};
