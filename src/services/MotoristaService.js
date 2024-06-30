// src/services/MotoristaService.js
const motoristaRepository = require('../repositories/MotoristaRepository');

class MotoristaService {
    async getAllMotoristas() {
        return await motoristaRepository.findAll();
    }

    async getMotoristaById(id) {
        return await motoristaRepository.findById(id);
    }

    async createMotorista(data) {
        return await motoristaRepository.create(data);
    }

    async updateMotorista(id, data) {
        const updated = await motoristaRepository.update(id, data);
        if (updated === 0) {
            throw new Error(`Caminhao with id ${id} not found`);
        }
        return await motoristaRepository.findById(id);
    }

    async deleteMotorista(id) {
        return await motoristaRepository.delete(id);
    }
}

module.exports = new MotoristaService();
