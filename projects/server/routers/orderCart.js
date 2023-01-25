const router = require("express").Router();
const axios = require("axios");
const { response } = require("express");
const { orderCart } = require("../controllers");
var request = require("request");

router.post("/createOrderCart", orderCart.createOrderCart);

router.post("/cost", async function (req, res) {
  try {
    const { origin, destination, weight, courier } = req.body;
    const response = { origin, destination, weight, courier };
    // console.log(response);
    var options = {
      method: "POST",
      url: "https://api.rajaongkir.com/starter/cost",
      headers: {
        key: "346809ad5e1954b3e5747406586c819f",
        "content-type": "application/x-www-form-urlencoded",
      },
      form: response,
    };
    request(options, function (error, response, body) {
      if (error) throw new Error(error);

      const parse = JSON.parse(body);
      res.status(200).send(parse);
    });
    // const result = await axios.post(
    //   "https://api.rajaongkir.com/starter/cost",
    //   {
    //     origin: 501,
    //     destination: 114,
    //     weight: 1500,
    //     courier: "tiki",
    //   },
    //   {
    //     headers: { key: "346809ad5e1954b3e5747406586c819f" },
    //   },
    // );
    // console.log(result);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
