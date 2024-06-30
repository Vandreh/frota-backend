// src/controllers/CaminhaoController.js
const caminhaoService = require('../services/CaminhaoService');

const createCaminhao = async (req, res, next) => {
  try {
    const { modelo, placa } = req.body;
    const caminhao = await caminhaoService.createCaminhao({ modelo, placa });
    res.status(201).json(caminhao);
  } catch (error) {
    next(error);
  }
};

const getCaminhoes = async (req, res, next) => {
  try {
    const caminhoes = await caminhaoService.getAllCaminhoes();
    res.status(200).json(caminhoes);
  } catch (error) {
    next(error);
  }
};

const getCaminhaoById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const caminhao = await caminhaoService.getCaminhaoById(id);
    if (!caminhao) {
      const error = new Error('Caminhão não encontrado');
      error.status = 404;
      throw error;
    }
    res.status(200).json(caminhao);
  } catch (error) {
    next(error);
  }
};

const updateCaminhao = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const updatedCaminhao = await caminhaoService.updateCaminhao(id, data);
    if (!updatedCaminhao) {
      const error = new Error('Caminhão não encontrado');
      error.status = 404;
      throw error;
    }
    return res.status(200).json(updatedCaminhao);
  } catch (error) {
    next(error);
  }
};

const deleteCaminhao = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = await caminhaoService.deleteCaminhao(id);
    if (!deleted) {
      const error = new Error('Caminhão não encontrado');
      error.status = 404;
      throw error;
    }
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

module.exports = { createCaminhao, getCaminhoes, getCaminhaoById, updateCaminhao, deleteCaminhao };
