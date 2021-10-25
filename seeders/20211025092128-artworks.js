"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("artworks", [
      {
        title: "Drie werelden",
        imageUrl: "https://www.metzemaekers.com/media/613e181e8eba4-001.jpg",
        hearts: 1,
        minimumBid: 11,
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 1,
      },
      {
        title: "Icosaëder",
        imageUrl: "https://www.metzemaekers.com/media/5ff87fba3e46e-001.jpg",
        hearts: 2,
        minimumBid: 22,
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 1,
      },
      {
        title: "Klimmen en dalen",
        imageUrl: "https://www.metzemaekers.com/media/artwork/62302.jpg",
        hearts: 3,
        minimumBid: 33,
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 2,
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("artworks", null, {});
  },
};
