const express = require('express');
const {
  createEntrega,
  getEntregas,
  getEntregaById,
  updateEntrega,
  deleteEntrega
} = require('../controllers/EntregaController');
const {
  createCaminhao,
  getCaminhoes,
  getCaminhaoById,
  updateCaminhao,
  deleteCaminhao
} = require('../controllers/CaminhaoController');
const {
  createMotorista,
  getMotoristas,
  getMotoristaById,
  updateMotorista,
  deleteMotorista
} = require('../controllers/MotoristaController');
const errorHandler = require('../middlewares/errorHandler');
const router = express.Router();

router.get('/', (req, res) => {res.status(200).json("ola mundo")} )

// Rotas de Entrega
router.post('/entregas', createEntrega);
router.get('/entregas', getEntregas);
router.get('/entregas/:id', getEntregaById);
router.put('/entregas/:id', updateEntrega);
router.delete('/entregas/:id', deleteEntrega);

// Rotas de Caminhao
router.post('/caminhoes', createCaminhao);
router.get('/caminhoes', getCaminhoes);
router.get('/caminhoes/:id', getCaminhaoById);
router.put('/caminhoes/:id', updateCaminhao);
router.delete('/caminhoes/:id', deleteCaminhao);

// Rotas de Motorista
router.post('/motoristas', createMotorista);
router.get('/motoristas', getMotoristas);
router.get('/motoristas/:id', getMotoristaById);
router.put('/motoristas/:id', updateMotorista);
router.delete('/motoristas/:id', deleteMotorista);

// Middleware de tratamento de erros
router.use(errorHandler);

module.exports = router;
