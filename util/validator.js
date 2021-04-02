module.exports.validateRegisterInput = (
  name,
  email,
  password,
  confirmPassword
) => {
  const errors = {};
  if (name.trim() === "") {
    errors.name = "Name must not be empty";
  }
  if (email.trim() === "") {
    errors.email = "Email must not be empty";
  } else {
    const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
    if (!email.match(regEx)) {
      errors.email = "Email must be a valid email address";
    }
  }
  if (password === "") {
    errors.password = "Password must not be empty";
  } else if (password !== confirmPassword) {
    errors.confirmPassword = "Passwords must match";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

module.exports.validateLoginInput = (email, password) => {
  const errors = {};
  if (email.trim() === "") {
    errors.email = "Email must not be empty";
  }
  if (password.trim() === "") {
    errors.password = "Password must not be empty";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

module.exports.validateUserProfileInput = (username, email, phone) => {
  const errors = {};
  if (username.trim() === "") {
    errors.username = "Username must not be empty";
  }
  if (email.trim() === "") {
    errors.email = "Email must not be empty";
  } else {
    const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
    if (!email.match(regEx)) {
      errors.email = "Email must be a valid email address";
    }
  }
  if (phone.trim() === "") {
    errors.phone = "Phone number must not be empty";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

module.exports.validateSellerProfileInput = (sellerName, sellerDesc) => {
  const errors = {};
  if (sellerName.trim() === "") {
    errors.sellerName = "Name must not be empty";
  }
  if (sellerDesc.trim() === "") {
    errors.sellerDesc = "Description must not be empty";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

module.exports.validateProductInput = (
  name,
  description,
  price,
  benefits,
  weight,
  stock,
  category
) => {
  const errors = {};
  if (name.trim() === "") {
    errors.name = "Product name must not be empty";
  }
  if (description.trim() === "") {
    errors.description = "Description must not be empty";
  }
  if (price === 0) {
    errors.price = "Product price must not be empty";
  }
  if (benefits.trim() === "") {
    errors.benefits = "Product benefits must not be empty";
  }
  if (weight === 0) {
    errors.weight = "Product weight must not be empty";
  }
  if (category.trim() === "") {
    errors.category = "Category must not be empty";
  }
  if (stock === 0) {
    errors.stock = "Product stock must not be empty";
  }
  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

module.exports.validateCartInput = (productQty) => {
  const errors = {};

  if (productQty === 0) {
    errors.productQty = "Quantity must not be 0";
  }
  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

module.exports.validateReviewInput = (body, rating, images) => {
  const errors = {};

  if (body.trim === "") {
    errors.body = "Body must not be empty";
  }
  if ((rating = 0)) {
    errors.rating = "Rating must not be zero";
  }
  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};
