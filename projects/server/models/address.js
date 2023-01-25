"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Address extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Address.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      addressFill: {
        type: DataTypes.STRING,
      },
      is_primary: {
        type: DataTypes.BOOLEAN,
      },
      postal_code: {
        type: DataTypes.INTEGER,
      },
      detail: { type: DataTypes.STRING },
      district: { type: DataTypes.STRING },
      province: {
        type: DataTypes.STRING,
      },
      provinceId: {
        type: DataTypes.STRING,
      },
      city: {
        type: DataTypes.STRING,
      },
      cityId: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "Address",
    },
  );
  return Address;
};
