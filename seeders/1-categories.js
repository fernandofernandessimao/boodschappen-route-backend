"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("categories", [
      {
        // 1
        description: "alcoholic drinks",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        // 2
        description: "bakery and pastry",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        // 3
        description: "cheese, meats, tapas",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        // 4
        description: "dried pasta, rice, beans",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        // 5
        description: "Oil and frying fat",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        // 6
        description: "vegetables, tubers and fruits",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        // 7
        description: "dairy, vegetable milk and eggs",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        // 8
        description: "bakery products",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        // 9
        description: "sugar, sweetener and honey",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        // 10
        description: "frozen products",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        // 11
        description: "non-alcoholic drinks and softdrinks",
        createdAt: new Date(),
        updatedAt: new Date(),
      },

    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("categories", null, {});
  },
};
