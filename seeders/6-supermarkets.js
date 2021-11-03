"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("supermarkets", [
      {
        name: "AH de Meenthof",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Jumbo de Meenthof",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Lidl Kerkenlanden",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "AH Langstraat",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "AH Kerkenlanden",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("supermarkets", null, {});
  },
};
