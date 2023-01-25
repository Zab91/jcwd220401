const rajaongkir = require("rajaongkir-nodejs").Starter(
  `346809ad5e1954b3e5747406586c819f`,
);
const openCageKey = "68f87966800b43798eb35464340ee809";
const { Op } = require("sequelize");
const db = require("../models");
const address = db.Address;
const user = db.User;
const axios = require("axios");

module.exports = {
  addressbyId: async (req, res) => {
    try {
      const getAddress = await address.findAll({
        where: {
          userId: req.params.id,
        },
        order: [["is_primary", "DESC"]],
      });
      return res.status(200).send({
        message: "User Address",
        data: getAddress,
      });
    } catch (err) {
      res.status(400).send(err);
    }
  },
  createAddress: async (req, res) => {
    try {
      const { addressFill, city, province, postal_code, detail, district } =
        req.body;

      // console.log({ city, province });
      const provinceCity = await axios.get(
        `https://api.rajaongkir.com/starter/city?id=${city}&province=${province}&key=346809ad5e1954b3e5747406586c819f`,
      );
      const nameProvince = provinceCity.data.rajaongkir.results.province;
      const nameCity = provinceCity.data.rajaongkir.results.city_name;
      const typeCity = provinceCity.data.rajaongkir.results.type;
      const nameCityandType = `${typeCity} ${nameCity}`;

      // const loc = await axios.get(
      //   `https://api.opencagedata.com/geocode/v1/json?key=68f87966800b43798eb35464340ee809&q=${district},${nameCityandType},${nameProvince}`,
      // );
      // // console.log("location", loc);
      // const lattitude = loc.data.results[0].geometry.lat;
      // const longtitude = loc.data.results[0].geometry.lng;

      const response = await address.create({
        addressFill,
        province: nameProvince,
        provinceId: province,
        city: nameCityandType,
        cityId: city,
        postal_code,
        detail,
        district,
        is_primary: true,
        UserId: req.params.id,
      });
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  },
  updateAddress: async (req, res) => {
    try {
      const { addressFill, city, province, postal_code, detail, district } =
        req.body;
      const { id } = req.params;
      const provinceCity = await axios.get(
        `https://api.rajaongkir.com/starter/city?id=${city}&province=${province}&key=346809ad5e1954b3e5747406586c819f`,
      );
      const nameProvince = provinceCity.data.rajaongkir.results.province;
      const nameCity = provinceCity.data.rajaongkir.results.city_name;
      const typeCity = provinceCity.data.rajaongkir.results.type;
      const nameCityandType = `${typeCity} ${nameCity}`;

      // const loc = await axios.get(
      //   `https://api.opencagedata.com/geocode/v1/json?key=68f87966800b43798eb35464340ee809&q=${district},${nameCityandType},${nameProvince}`,
      // );
      // const lattitude = location.data.results[0].geometry.lat;
      // const longtitude = location.data.results[0].geometry.lng;

      const updatedAddress = await address.update(
        {
          addressFill,
          province: nameProvince,
          city: nameCityandType,
          postal_code,
          detail,
          district,
        },
        {
          where: {
            id: id,
          },
        },
      );
      const findAddress = await address.findByPk(id);
      res.status(200).send({
        msg: "Address Updated",
        data: updatedAddress,
      });
    } catch (err) {
      res.status(400).send(err);
    }
  },
  delAddress: async (req, res) => {
    try {
      const { id } = req.params;
      await address.destroy({
        where: {
          id: id,
        },
      });
      res.status(200).send({
        msg: "Address Successfully Deleted",
      });
    } catch (err) {
      res.status(400).send(err);
    }
  },
  setDefault: async (req, res) => {
    try {
      const { id } = req.params;
      const findDef = await address.findOne({
        where: {
          is_primary: true,
          UserId: req.user.id,
        },
      });
      if (findDef) {
        await address.update(
          {
            is_primary: false,
          },
          {
            where: {
              id: findDef.id,
            },
          },
        );

        await address.update(
          {
            is_primary: true,
          },
          { where: { id: id } },
        );
        res.status(200).send({
          msg: "success",
        });
      }
      if (!findDef) {
        await address.update(
          {
            is_primary: true,
          },
          {
            where: {
              id: id,
            },
          },
        );
        res.status(200).send({
          msg: "success",
        });
      }
      res.status(200).send({
        msg: "set as primary Address",
        data: findDef,
      });
    } catch (err) {
      res.status(400).send(err);
    }
  },
  findAddressById: async (req, res) => {
    try {
      const responseAddress = await address.findOne({
        where: {
          id: req.params.id,
        },
      });
      res.status(200).send({
        msg: "Got it",
        data: responseAddress,
      });
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  },
};
