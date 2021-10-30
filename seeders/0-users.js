"use strict";
const bcrypt = require("bcrypt");
const { SALT_ROUNDS } = require("../config/constants");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("users", [
      {
        firstName: "Fernando",
        lastName: "Simao",
        email: "fernando@nasa.gov",
        password: bcrypt.hashSync("1243", SALT_ROUNDS),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: "Admin",
        lastName: "nistrator",
        email: "admin@admin.com",
        password: bcrypt.hashSync("admin", SALT_ROUNDS),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("users", null, {});
  },
};
