module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Histories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      spKe: {
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
      shortUrl: {
        type: Sequelize.STRING,
      },
      longUrl: {
        type: Sequelize.STRING,
      },
      totalPoint: {
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
    await queryInterface.dropTable('Histories');
  },
};
