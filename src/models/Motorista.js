const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Motorista = sequelize.define('Motorista', {
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  }, {
    tableName: 'Motoristas'
  });

  return Motorista;
};
