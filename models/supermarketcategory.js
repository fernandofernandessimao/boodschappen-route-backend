"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class supermarketCategory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      supermarketCategory.belongsTo(models.supermarket);
      supermarketCategory.belongsTo(models.category);
    }
  }
  supermarketCategory.init(
    {
      supermarketId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,   
      },
    },
    {
      sequelize,
      modelName: "supermarketCategory",
    }
  );
  return supermarketCategory;
};
