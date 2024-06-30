// src/services/EntregaService.js
const entregaRepository = require('../repositories/EntregaRepository');
const { Op } = require('sequelize');

class EntregaService {
    async getAllEntregas() {
        return await entregaRepository.findAll();
    }

    async getEntregaById(id) {
        return await entregaRepository.findById(id);
    }

    async count(query) {
        return await entregaRepository.count(query);
    }

    async createEntrega(data) {
        return await entregaRepository.create(data);
    }

    async updateEntrega(id, data) {
        return await entregaRepository.update(id, data);
    }

    async deleteEntrega(id) {
        return await entregaRepository.delete(id);
    }
}

module.exports = new EntregaService();
