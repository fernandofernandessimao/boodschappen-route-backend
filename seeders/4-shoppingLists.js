"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("shoppingLists", [
      {
        productId: 1,
        listId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productId: 2,
        listId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productId: 3,
        listId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productId: 4,
        listId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productId: 5,
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
