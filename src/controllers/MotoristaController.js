const motoristaService = require('../services/MotoristaService');

const createMotorista = async (req, res, next) => {
  try {
    const { nome } = req.body;
    const motorista = await motoristaService.createMotorista({ nome });
    res.status(201).json(motorista);
  } catch (error) {
    next(error);
  }
};

const getMotoristas = async (req, res, next) => {
  try {
    const motoristas = await motoristaService.getAllMotoristas();
    res.status(200).json(motoristas);
  } catch (error) {
    next(error);
  }
};

const getMotoristaById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const motorista = await motoristaService.getMotoristaById(id);
    if (!motorista) {
      const error = new Error('Motorista não encontrado');
      error.status = 404;
      throw error;
    }
    res.status(200).json(motorista);
  } catch (error) {
    next(error);
  }
};

const updateMotorista = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const updatedMotorista = await motoristaService.updateMotorista(id, data);
    if (!updatedMotorista) {
      const error = new Error('Motorista não encontrado');
      error.status = 404;
      throw error;
    }
    return res.status(200).json(updatedMotorista);
  } catch (error) {
    next(error);
  }
};

const deleteMotorista = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = await motoristaService.deleteMotorista(id);
    if (!deleted) {
      const error = new Error('Motorista não encontrado');
      error.status = 404;
      throw error;
    }
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

module.exports = { createMotorista, getMotoristas, getMotoristaById, updateMotorista, deleteMotorista };
