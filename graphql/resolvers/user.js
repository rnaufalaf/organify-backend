const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { UserInputError } = require("apollo-server");

const {
  validateRegisterInput,
  validateLoginInput,
  validateUserProfileInput,
  validateSellerProfileInput,
} = require("../../util/validator");
const { SECRET_KEY } = require("../../config");
const User = require("../../models/user");
const checkAuth = require("../../util/checkAuth");

function generateToken(user) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      username: user.username,
    },
    SECRET_KEY,
    { expiresIn: "1h" }
  );
}

module.exports = {
  Mutation: {
    async login(_, { email, password }) {
      const { valid, errors } = validateLoginInput(email, password);

      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }

      const user = await User.findOne({ email: email });

      if (!user) {
        errors.general = "User not found";
        throw new UserInputError("User not found", { errors });
      }

      const match = await bcrypt.compare(password, user.password);

      if (!match) {
        errors.general = "Wrong credentials";
        throw new UserInputError("Wrong credentials", { errors });
      }

      const token = generateToken(user);

      return {
        ...user._doc,
        id: user._id,
        token,
      };
    },
    async register(
      _,
      { registerInput: { username, email, password, confirmPassword } }
    ) {
      // Validate user data
      const { valid, errors } = validateRegisterInput(
        username,
        email,
        password,
        confirmPassword
      );

      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }
      // Ensure that user does not already existed
      const user = await User.findOne({ username });
      if (user) {
        throw new UserInputError("Username is taken", {
          errors: {
            username: "This username is taken",
          },
        });
      }
      // Hash password and create an auth token
      password = await bcrypt.hash(password, 12);

      const newUser = new User({
        email: email,
        password: password,
        phone: "",
        address: "",
        buyer: {
          username: username,
          avatar: "",
          createdAt: new Date().toISOString(),
        },
        seller: {
          sellerName: "",
          sellerAvatar: "",
          sellerDesc: "",
          createdAt: "",
          balance: 0,
        },
      });

      const res = await newUser.save();

      const token = generateToken(res);

      return {
        ...res._doc,
        id: res._id,
        token,
      };
    },
    async updateUserProfile(
      _,
      {
        updateUserInput: { email, password, phone, address, username, avatar },
      },
      context
    ) {
      const loggedUser = checkAuth(context);

      const user = await User.findOne({ email });
      if (user && user._id.toString() !== loggedUser.id) {
        throw new UserInputError("Email is taken", {
          errors: {
            username: "This email is taken",
          },
        });
      }

      const { valid, errors } = validateUserProfileInput(
        username,
        email,
        phone
      );
      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }

      password = await bcrypt.hash(password, 12);

      const updatedUser = await User.findOneAndUpdate(
        { _id: loggedUser.id },
        {
          email: email,
          phone: phone,
          password: password,
          address: address,
          "buyer.username": username,
          "buyer.avatar": avatar,
          "buyer.createdAt": new Date().toISOString(),
        },
        { new: true }
      );
      const token = generateToken(user);
      return {
        ...updatedUser._doc,
        id: updatedUser._id,
        token,
      };
    },
    async updateSellerProfile(
      _,
      { updateSellerInput: { sellerName, sellerDesc, sellerAvatar } },
      context
    ) {
      const loggedUser = checkAuth(context);
      const { valid, errors } = validateSellerProfileInput(
        sellerName,
        sellerDesc,
        sellerAvatar
      );
      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }

      const sellerNameExists = await User.findOne({
        "seller.sellerName": sellerName.trim(),
      });

      if (
        sellerNameExists &&
        sellerNameExists._id.toString() !== loggedUser.id
      ) {
        throw new UserInputError("Name is taken", {
          errors: {
            sellerName: "Name is taken",
          },
        });
      }

      const user = await User.findById(loggedUser.id);

      const activateSellerProfile = await User.findOneAndUpdate(
        { _id: loggedUser.id },
        {
          "seller.sellerName": sellerName,
          "seller.sellerDesc": sellerDesc,
          "seller.avatar": sellerAvatar,
          "seller.createdAt": new Date().toISOString(),
        },
        { new: true }
      );
      const token = generateToken(user);
      return {
        ...activateSellerProfile._doc,
        id: activateSellerProfile._id,
        token,
      };
    },
  },
  Query: {
    async getUsers() {
      try {
        const users = await User.find();
        return users;
      } catch (err) {
        throw new Error(err);
      }
    },
    async getUser(_, { userId }) {
      try {
        const user = await User.findById(userId);
        if (user) {
          return user;
        } else {
          throw new error("User not found");
        }
      } catch (err) {
        throw new Error(err);
      }
    },
    async getSeller(_, { sellerId }) {
      try {
        const user = await User.findOne({ "seller.id": sellerId });
        if (user) {
          return user;
        } else {
          throw new Error("Seller not found");
        }
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};
