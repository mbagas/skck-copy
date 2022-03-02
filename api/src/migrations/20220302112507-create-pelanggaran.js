module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Pelanggarans', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      pelanggaranId: {
        type: Sequelize.INTEGER,
      },
      siswaId: {
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Pelanggarans');
  },
};
