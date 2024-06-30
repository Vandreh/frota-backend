// src/repositories/CaminhaoRepository.js
const { Caminhao } = require('../models');

class CaminhaoRepository {
    async findAll() {
        return await Caminhao.findAll();
    }

    async findById(id) {
        return await Caminhao.findByPk(id);
    }

    async findAndCountAll(query) {
        return await Caminhao.findAndCountAll(query);
    }

    async create(data) {
        return await Caminhao.create(data);
    }

    async update(id, data) {
        try {
            const [updated] = await Caminhao.update(data, { where: { id } });
            return updated;
        } catch (error) {
            throw new Error(`Unable to update Caminhao: ${error.message}`);
        }
    }

    async delete(id) {
        console.log(id);
        return await Caminhao.destroy({ where: { id } });
    }
}

module.exports = new CaminhaoRepository();
