"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("products", [
      {
        name: "Beer",
        quantity: 24,
        price: 15.0,
        position: [4, 4],
        categoryId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Bread",
        quantity: 2,
        price: 6.3,
        categoryId: 2,
        position: [0, 4],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Cheese",
        quantity: 1,
        price: 3.79,
        categoryId: 3,
        position: [2, 1],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Pasta",
        quantity: 2,
        price: 1.8,
        categoryId: 4,
        position: [3, 0],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Olive oil",
        quantity: 1,
        price: 4.5,
        categoryId: 5,
        position: [1, 3],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("products", null, {});
  },
};
