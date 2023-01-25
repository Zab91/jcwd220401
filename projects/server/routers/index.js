const userRoutesLogin = require("./userLogin");
const userRoutes = require("./user");
const userRoutesAdmin = require("./admin");
const productRoutes = require("./product");
const cartRoutes = require("./cart");
const orderCart = require("./orderCart");
const addressRoutes = require("./address");

module.exports = {
  userRoutesLogin,
  userRoutes,
  userRoutesAdmin,
  productRoutes,
  cartRoutes,
  addressRoutes,
  orderCart,
};
