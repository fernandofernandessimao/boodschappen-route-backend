"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("shoppingLists", [
      {
        productId: 1,
        listId: 1,
        quantity: 24,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productId: 2,
        quantity: 6,
        listId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productId: 3,
        quantity: 1,
        listId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productId: 4,
        quantity: 1,
        listId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productId: 5,
        quantity: 2,
        listId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("shoppingLists", null, {});
  },
};
