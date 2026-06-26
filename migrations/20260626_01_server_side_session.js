const { DataTypes } = require('sequelize')

module.exports = {
  up: async ({ context: queryInerface }) => {
    await queryInerface.addColumn('users', 'disabled', {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    })
    await queryInerface.createTable('sessions', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'users', key: 'id' },
      },
      token: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    })
  },
  down: async ({ context: queryInerface }) => {
    await queryInerface.dropTable('sessions')
    await queryInerface.removeColumn('users', 'disabled')
  },
}
