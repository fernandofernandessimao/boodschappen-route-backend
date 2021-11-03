"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class supermarketLocation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      supermarketLocation.belongsTo(models.supermarket);
      supermarketLocation.belongsTo(models.location);
    }
  }
  supermarketLocation.init(
    {
      supermarketId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      locationId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "supermarketLocation",
    }
  );
  return supermarketLocation;
};
