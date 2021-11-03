"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("supermarketLocations", [
      {
        locationId: 2,
        supermarketId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        locationId: 2,
        supermarketId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        locationId: 1,
        supermarketId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        locationId: 1,
        supermarketId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        locationId: 1,
        supermarketId: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('supermarketLocations', null, {});
  },
};
