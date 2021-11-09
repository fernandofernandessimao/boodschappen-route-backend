"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("products", [
      {
        name: "beer",
        position: [4, 4],
        categoryId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "water",
        position: [4, 4],
        categoryId: 11,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "bread",
        categoryId: 2,
        position: [0, 4],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "brown sugar",
        categoryId: 9,
        position: [0, 4],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "wheat flour",
        categoryId: 8,
        position: [0, 4],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "apple",
        categoryId: 6,
        position: [0, 4],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "banana",
        categoryId: 6,
        position: [0, 4],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "butter",
        categoryId: 7,
        position: [0, 4],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "eggplant",
        categoryId: 6,
        position: [0, 4],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "carrot",
        categoryId: 6,
        position: [0, 4],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "sweet potato",
        categoryId: 6,
        position: [0, 4],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "basmati rice",
        categoryId: 4,
        position: [0, 4],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "chickpea",
        categoryId: 4,
        position: [0, 4],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "eggs",
        categoryId: 7,
        position: [0, 4],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "vegan bitterballen",
        categoryId: 10,
        position: [0, 4],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "cheese",
        categoryId: 3,
        position: [2, 1],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "pasta",
        categoryId: 4,
        position: [3, 0],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "olive oil",
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
