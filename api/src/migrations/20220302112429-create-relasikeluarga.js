module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('RelasiKeluargas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      orangTuaId: {
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
    await queryInterface.dropTable('RelasiKeluargas');
  },
};
