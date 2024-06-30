const { Sequelize } = require('sequelize');
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite' // Caminho do arquivo de banco de dados SQLite
});

const Caminhao = require('./Caminhao')(sequelize);
const Motorista = require('./Motorista')(sequelize);
const Entrega = require('./Entrega')(sequelize);

// Definir associações entre modelos, se houver
Caminhao.hasOne(Entrega, { foreignKey: 'caminhaoId' });
Motorista.hasOne(Entrega, { foreignKey: 'motoristaId' });
Entrega.belongsTo(Caminhao, { foreignKey: 'caminhaoId' });
Entrega.belongsTo(Motorista, { foreignKey: 'motoristaId' });

module.exports = {
  sequelize,
  Caminhao,
  Motorista,
  Entrega
};
