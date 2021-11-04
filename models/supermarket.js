"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class supermarket extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      supermarket.belongsToMany(models.location, {
        through: "supermarketLocations",
        foreignKey: "supermarketId",
      });
      supermarket.belongsToMany(models.category, {
        through: "supermarketCategories",
        foreignKey: "supermarketId",
      });
    }
  }
  supermarket.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "supermarket",
    }
  );
  return supermarket;
};
