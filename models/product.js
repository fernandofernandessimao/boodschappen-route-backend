"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      product.belongsToMany(models.list, {
        through: "shoppingLists",
        foreignKey: "productId",
      });
      product.belongsTo(models.category);
    }
  }
  product.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },      
      price: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
      position: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "product",
    }
  );
  return product;
};
