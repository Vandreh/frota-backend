const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Caminhao = sequelize.define('Caminhao', {
    modelo: {
      type: DataTypes.STRING,
      allowNull: false
    },
    placa: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  },
  {
    tableName: 'Caminhoes'
  });

  return Caminhao;
};
