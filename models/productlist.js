"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class productList extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      productList.belongsTo(models.list);
      productList.belongsTo(models.product);
    }
  }
  productList.init(
    {
      listId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "productList",
    }
  );
  return productList;
};
