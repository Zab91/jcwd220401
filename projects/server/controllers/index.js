const userControllerLogin = require("./userLogin");
const userController = require("./user");
const adminController = require("./admin");
const productController = require("./product");
const cartController = require("./cart");
const addressController = require("./address");
const orderCart = require("./orderCart");

module.exports = {
  userControllerLogin,
  userController,
  adminController,
  productController,
  addressController,
  cartController,
  orderCart,
};
