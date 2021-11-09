"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("supermarketCategories", [
      {
        supermarketId: 1,
        categoryId: 6,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        supermarketId: 1,
        categoryId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        supermarketId: 1,
        categoryId: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        supermarketId: 1,
        categoryId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        supermarketId: 1,
        categoryId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        supermarketId: 1,
        categoryId: 8,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        supermarketId: 1,
        categoryId: 9,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        supermarketId: 1,
        categoryId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        supermarketId: 1,
        categoryId: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      },      
      {
        supermarketId: 1,
        categoryId: 11,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        supermarketId: 1,
        categoryId: 7,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDDelete("supermarketCategories", null, {});
  },
};
