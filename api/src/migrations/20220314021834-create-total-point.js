module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('TotalPoints', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      totalPoint: {
        type: Sequelize.INTEGER,
      },
      siswaId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Siswas',
          key: 'id',
        },
        onDelete: 'CASCADE',
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
    await queryInterface.dropTable('TotalPoints');
  },
};
