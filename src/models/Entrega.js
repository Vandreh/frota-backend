const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Entrega = sequelize.define('Entrega', {
    tipo: {
      type: DataTypes.STRING,
      allowNull: false
    },
    valor: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    regiao: {
      type: DataTypes.STRING,
      allowNull: false
    },
    seguro: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    },
    indicador_valiosa: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    indicador_perigosa: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'pendente'
    }
  });

  return Entrega;
};
