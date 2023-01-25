const { Op } = require("sequelize");
const db = require("../models");
const address = db.Address;
const user = db.User;
const axios = require("axios");

module.exports = {
  createOrderCart: async (req, res) => {
    try {
      const { origin, destination, weight, courier } = req.body;
      const cartOrder = await axios.post(
        `https://api.rajaongkir.com/starter/cost`,
      );
      return res.status(200).send({
        message: "Order Telah dibuat",
        data: cartOrder,
      });
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  },
};
