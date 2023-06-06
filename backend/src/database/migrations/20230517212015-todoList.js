"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("todoList", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: "No description",
      },
      createdAt: {
        allowNull: true,
        defaultValue: new Date(),
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: true,
        defaultValue: new Date(),
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface) => queryInterface.dropTable("todoList"),
};
