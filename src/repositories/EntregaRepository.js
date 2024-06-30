// src/repositories/EntregaRepository.js
const { Entrega } = require('../models');
const { Caminhao } = require('../models');
const { Motorista } = require('../models');

class EntregaRepository {
    async findAll() {
        return await Entrega.findAll({
            include: [
              { model: Caminhao, attributes: ['modelo', 'placa'] },
              { model: Motorista, attributes: ['nome'] }
            ]
        });
    }

    async findById(id) {
        return await Entrega.findByPk(id, {
            include: [
                { model: Caminhao, attributes: ['modelo', 'placa'] },
                { model: Motorista, attributes: ['nome'] }
            ]
        });
    }

    async count(query) {
        return await Entrega.findAndCountAll(query);
    }

    async create(data) {
        return await Entrega.create(data);
    }

    async update(id, data) {
        await Entrega.update(data, { where: { id } });
        return this.findById(id);
    }

    async delete(id) {
        return await Entrega.destroy({ where: { id } });
    }
}

module.exports = new EntregaRepository();
