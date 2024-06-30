// src/repositories/MotoristaRepository.js
const { Motorista } = require('../models');

class MotoristaRepository {
    async findAll() {
        return await Motorista.findAll();
    }

    async findById(id) {
        return await Motorista.findByPk(id);
    }

    async create(data) {
        return await Motorista.create(data);
    }

    async update(id, data) {
        try {
            const [updated] = await Motorista.update(data, { where: { id } });
            return updated;
        } catch (error) {
            throw new Error(`Unable to update Caminhao: ${error.message}`);
        }
    }

    async delete(id) {
        return await Motorista.destroy({ where: { id } });
    }
}

module.exports = new MotoristaRepository();
