"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    await queryInterface.bulkInsert(
      "CategoryProducts",
      [
        {
          name: "Hobi",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Kendaraan",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Baju",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Elektronik",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Kesehatan",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("CategoryProducts", null, {});
  },
};
