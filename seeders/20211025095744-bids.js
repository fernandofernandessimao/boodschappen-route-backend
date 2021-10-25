"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("bids", [
      {
        email: "bidder1@bidder.com",
        amount: 1010,
        createdAt: new Date(),
        updatedAt: new Date(),
        artworkId: 1,
      },
      {
        email: "bidder2@bidder.com",
        amount: 404,
        createdAt: new Date(),
        updatedAt: new Date(),
        artworkId: 1,
      },
      {
        email: "bidder3@bidder.com",
        amount: 2020,
        createdAt: new Date(),
        updatedAt: new Date(),
        artworkId: 2,
      },
      {
        email: "bidder4@bidder.com",
        amount: 505,
        createdAt: new Date(),
        updatedAt: new Date(),
        artworkId: 2,
      },
      {
        email: "bidder5@bidder.com",
        amount: 3030,
        createdAt: new Date(),
        updatedAt: new Date(),
        artworkId: 3,
      },
    ]);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("bids", null, {});
  },
};
