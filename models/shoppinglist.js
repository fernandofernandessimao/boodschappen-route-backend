"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class shoppingList extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      shoppingList.belongsTo(models.list);
      shoppingList.belongsTo(models.product);
    }
  }
  shoppingList.init(
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
      modelName: "shoppingList",
    }
  );
  return shoppingList;
};
