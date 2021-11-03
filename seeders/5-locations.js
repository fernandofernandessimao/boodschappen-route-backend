"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("locations", [
      {
        name: "Hilversum",
        createdAt: new Date(),
        updatedAt: new Date(),
      },    
      {
        name: "Kortenhoef",
        createdAt: new Date(),
        updatedAt: new Date(),
      },      
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("locations", null, {});
  },
};
