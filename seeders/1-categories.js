"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("categories", [
      {
        description: "alcoholic drinks",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        description: "bakery and pastry",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        description: "cheese, meats, tapas",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        description: "dried pasta, rice, beans",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        description: "Oil and frying fat",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("categories", null, {});
  },
};
