const { AuthenticationError, UserInputError } = require("apollo-server");

const Cart = require("../../models/cart");
const checkAuth = require("../../util/checkAuth");
const { validateCartInput } = require("../../util/validator");

module.exports = {
  Query: {
    async getProductsInCartBySeller(_, __, context) {
      try {
        const user = checkAuth(context);
        const cart = await Cart.find({ user: user.id })
          .populate("user")
          .populate({
            path: "product",
            populate: {
              path: "user",
              options: { sort: { "seller.username": -1 } },
            },
          });
        if (cart) {
          return cart;
        } else {
          throw new Error("Products not found");
        }
      } catch (err) {
        throw new Error(err);
      }
    },

    async getProductsCart(_, __, context) {
      try {
        const user = checkAuth(context);
        const cart = await Cart.find({ user: user.id })
          .populate("user")
          .populate({
            path: "product",
            populate: {
              path: "user",
              options: { sort: { "seller.username": -1 } },
            },
          });
        if (cart) {
          return cart;
        } else {
          throw new Error("Products not found");
        }
      } catch (err) {
        throw new Error(err);
      }
    },

    async getProductInCart(_, { productId }, context) {
      try {
        const user = checkAuth(context);
        const cart = await Cart.findOne({ product: productId, user: user.id })
          .populate("user")
          .populate({
            path: "product",
            populate: {
              path: "user",
              options: { sort: { "seller.username": -1 } },
            },
          });
        if (cart) {
          return cart;
        } else {
          throw new Error("User cart item not found");
        }
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  Mutation: {
    async addProductToCart(_, { productId, productQty, isChecked }, context) {
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
        productInCart.isChecked = isChecked;
        const updatedCart = await productInCart.save();
        return updatedCart;
      } else {
        const newCart = new Cart({
          product: productId,
          user: user.id,
          productQty: productQty,
          isChecked: false,
          createdAt: new Date().toISOString(),
        });

        const cart = await newCart.save();
        return cart;
      }
    },
    async editProductsInCart(_, { productId, productQty, isChecked }, context) {
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
        productInCart.productQty = productQty;
        productInCart.isChecked = isChecked;
        const updatedCart = await productInCart.save();
        return updatedCart;
      } else {
        const newCart = new Cart({
          product: productId,
          user: user.id,
          isChecked: false,
          productQty: productQty,
          createdAt: new Date().toISOString(),
        });

        const cart = await newCart.save();
        return cart;
      }
    },
    async deleteProductFromCart(_, { cartId }) {
      try {
        const ProductInCart = await Cart.findById(cartId);
        if (ProductInCart) {
          await ProductInCart.delete();
          return "Product deleted from cart";
        }
      } catch (err) {
        throw new Error(err);
      }
    },
    async addChecklistToCart(
      _,
      { checkedCart: { productIds, isChecked, productQty } }
    ) {
      const updatedCart = await Cart.updateMany(
        { product: { $in: productIds } },
        {
          isChecked: isChecked,
        },
        { new: true }
      );
      return "Cart items updated";
    },
  },
};
