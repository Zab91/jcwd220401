const router = require("express").Router();
const axios = require("axios");
const { response } = require("express");
const { addressController } = require("../controllers");

router.post("/createAddress/:id", addressController.createAddress);
router.get("/addressById/:id", addressController.addressbyId);
router.get("/findAddressById/:id", addressController.findAddressById);
router.patch("/updateAddress/:id", addressController.updateAddress);
router.patch("/defaultAddress/:id", addressController.setDefault);
router.delete("/delAddress/:id", addressController.delAddress);

axios.defaults.baseRajaongkir = `https://api.rajaongkir.com/starter`;
axios.defaults.headers.common["key"] = `346809ad5e1954b3e5747406586c819f`;
axios.defaults.headers.post[
  "Content-Type"
] = `application/x-www-form-urlencoded`

router.get("/province", async function (req, res) {
  try {
    const response = await axios.get(
      "https://api.rajaongkir.com/starter/province",
      { headers: { key: "346809ad5e1954b3e5747406586c819f" } },
    );
    res.status(200).send(response.data.rajaongkir);
    // console.log(response.data.rajaongkir.results);
  } catch (err) {
    console.log(err);
  }
});
// axios
//   .get("/province")
//   .then(response => res.json(response.data))
//   .catch(err => res.send(err));

router.get("/city/:provinceId", async function (req, res) {
  try {
    const id = req.params.provinceId;
    const response = await axios.get(
      `https://api.rajaongkir.com/starter/city?province=${id}`,
      { headers: { key: "346809ad5e1954b3e5747406586c819f" } },
    );
    console.log(response.data.rajaongkir.results);
    console.log(id);
    res.status(200).send(response.data.rajaongkir);
  } catch (err) {
    console.log(err);
  }

  // axios
  //   .get(`/city?province=${id}`)
  //   .then(response => res.json(response.data))
  //   .catch(err => res.send(err));
});

module.exports = router;
