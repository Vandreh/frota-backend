// src/services/CaminhaoService.js
const caminhaoRepository = require('../repositories/CaminhaoRepository');

class CaminhaoService {
    async getAllCaminhoes() {
        return await caminhaoRepository.findAll();
    }

    async getCaminhaoById(id) {
        return await caminhaoRepository.findById(id);
    }

    async createCaminhao(data) {
        return await caminhaoRepository.create(data);
    }

    async updateCaminhao(id, data) {
        const updated = await caminhaoRepository.update(id, data);
        if (updated === 0) {
            throw new Error(`Caminhao with id ${id} not found`);
        }
        return await caminhaoRepository.findById(id);
    }

    async deleteCaminhao(id) {
        const updated = await caminhaoRepository.delete(id);
        if (updated === 0) {
            throw new Error(`Caminhao with id ${id} not found`);
        }
        return await caminhaoRepository.findAll();
    }
}

module.exports = new CaminhaoService();
