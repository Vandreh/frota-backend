const entregaService = require('../services/EntregaService');
const caminhaoService = require('../services/CaminhaoService');
const motoristaService = require('../services/MotoristaService');
const { Op } = require('sequelize');

const createEntrega = async (req, res, next) => {
  try {
    const {
      caminhaoId,
      motoristaId,
      tipo,
      valor,
      regiao,
      seguro,
      // indicador_valiosa,
      indicador_perigosa,
      status
    } = req.body;

    // Verificação de existência do caminhão e motorista
    const caminhao = await caminhaoService.getCaminhaoById(caminhaoId);
    if (!caminhao) {
      const error = new Error('Caminhão não encontrado');
      error.status = 404;
      throw error;
    }

    const motorista = await motoristaService.getMotoristaById(motoristaId);
    if (!motorista) {
      const error = new Error('Motorista não encontrado');
      error.status = 404;
      throw error;
    }

    // Regra 1: Um caminhão só pode estar associado a uma entrega
    // status (pendente, em-andamento, concluido)
    const existingDelivery = await entregaService.count({
      where: {
          caminhaoId: caminhaoId,
          [Op.or]: [
              { status: 'pendente' },
              { status: 'em-andamento' }
          ]
      }
    })
    if (existingDelivery.count > 0) {
        throw new Error('O caminhão já está associado a uma entrega.');
    }

    const mesAtual = new Date().getMonth(); // Obtém o mês atual (0 a 11)
    
    // Regra 2: Entregas com valores maiores que 30 mil devem receber um indicador de valiosa
    let valiosa = false;
    if (valor > 30000) {
      valiosa = true;
    }

    // Regra 3: Entregas do Tipo eletrônicos devem ter um indicador se tem seguro ou não
      // Frontend
    
    // Regra 4: Entregas do Tipo Combustível devem ter um indicador de perigosa
    let perigosa = false;
    if (tipo === 'Combustível') {
      perigosa = true;
    }

    
    // Regra 5: Um caminhão só pode fazer 4 entregas por mês
    const entregasCaminhao = await entregaService.count({ 
      where: { 
        caminhaoId,
        createdAt: {
          [Op.and]: [
            { [Op.gte]: new Date(new Date().getFullYear(), mesAtual, 1) }, // Primeiro dia do mês atual
            { [Op.lt]: new Date(new Date().getFullYear(), mesAtual + 1, 1) } // Primeiro dia do próximo mês
          ]
        }
      }
    });

    if (entregasCaminhao.count >= 4) {
      const error = new Error('O caminhão já fez 4 entregas este mês.');
      error.status = 400;
      throw error;
    }

    // Regra 6: Um motorista de um caminhão só pode fazer duas entregas por mês
    const entregasMotorista = await entregaService.count({ 
      where: { 
        motoristaId,
        createdAt: {
          [Op.and]: [
            { [Op.gte]: new Date(new Date().getFullYear(), mesAtual, 1) }, // Primeiro dia do mês atual
            { [Op.lt]: new Date(new Date().getFullYear(), mesAtual + 1, 1) } // Primeiro dia do próximo mês
          ]
        }
      }
    })
    if (entregasMotorista.count >= 2) {
      const error = new Error('O motorista já fez 2 entregas este mês.');
      error.status = 400;
      throw error;
    }
 
    let valorFinal = valor;
    // Regra 7: Entregas para o Nordeste têm uma taxa de 20% no valor do frete;
    if (regiao === 'Nordeste') valorFinal *= 1.20;
    // Regra 8: Entregas para Argentina têm uma taxa de 40% no valor do frete;
    if (regiao === 'Argentina') valorFinal *= 1.40;
    // Regra 9: Entregas para a Amazônia têm uma taxa de 30% no valor do frete;
    if (regiao === 'Amazônia') valorFinal *= 1.30;

    // Regra 10: Um motorista só pode fazer uma entrega para o Nordeste
    const entregasMotoristaNordeste = await entregaService.count({ 
      where: { 
        motoristaId,
        regiao: 'Nordeste'
      }
    });
    if (entregasMotoristaNordeste.count >= 1) {
      const error = new Error('O motorista já fez uma entrega para o Nordeste.');
      error.status = 400;
      throw error;
    } 

    const entrega = await entregaService.createEntrega({
      caminhaoId,
      motoristaId,
      tipo,
      valor: valorFinal,
      regiao,
      seguro,
      indicador_valiosa: valiosa,
      indicador_perigosa: perigosa,
      status
    });

    res.status(201).json(entrega);
  } catch (error) {
    next(error);
  }
};

const getEntregas = async (req, res, next) => {
  try {
    const entregas = await entregaService.getAllEntregas();
    res.status(200).json(entregas);
  } catch (error) {
    next(error);
  }
};

const getEntregaById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const entrega = await entregaService.getEntregaById(id);
    if (!entrega) {
      const error = new Error('Entrega não encontrada');
      error.status = 404;
      throw error;
    }
    res.status(200).json(entrega);
  } catch (error) {
    next(error);
  }
};

const updateEntrega = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      caminhaoId,
      motoristaId,
      tipo,
      valor,
      regiao,
      seguro,
      // indicador_valiosa,
      indicador_perigosa,
      status
    } = req.body;

    const entrega = await entregaService.getEntregaById(id);
    if (!entrega) {
      const error = new Error('Entrega não encontrada');
      error.status = 404;
      throw error;
    }

    // Verificação de existência do caminhão e motorista
    const caminhao = await caminhaoService.getCaminhaoById(caminhaoId);
    if (!caminhao) {
      const error = new Error('Caminhão não encontrado');
      error.status = 404;
      throw error;
    }

    const motorista = await motoristaService.getMotoristaById(motoristaId);
    if (!motorista) {
      const error = new Error('Motorista não encontrado');
      error.status = 404;
      throw error;
    }

    // Verificação de regras de negócio
    // const mesAtual = new Date().getMonth(); // Obtém o mês atual (0 a 11)

    // const entregasCaminhao = await entregaService.count({ 
    //   where: { 
    //     caminhaoId,
    //     id: { [Op.not]: id }, // Exclui a própria entrega atual da contagem
    //     createdAt: {
    //       [Op.and]: [
    //         { [Op.gte]: new Date(new Date().getFullYear(), mesAtual, 1) }, // Primeiro dia do mês atual
    //         { [Op.lt]: new Date(new Date().getFullYear(), mesAtual + 1, 1) } // Primeiro dia do próximo mês
    //       ]
    //     }
    //   }
    // });
    // if (entregasCaminhao.count >= 4) {
    //   const error = new Error('O caminhão já fez 4 entregas este mês.');
    //   error.status = 400;
    //   throw error;
    // }

    // const entregasMotorista = await entregaService.count({ 
    //   where: { 
    //     motoristaId,
    //     id: { [Op.not]: id }, // Exclui a própria entrega atual da contagem
    //     createdAt: {
    //       [Op.and]: [
    //         { [Op.gte]: new Date(new Date().getFullYear(), mesAtual, 1) }, // Primeiro dia do mês atual
    //         { [Op.lt]: new Date(new Date().getFullYear(), mesAtual + 1, 1) } // Primeiro dia do próximo mês
    //       ]
    //     }
    //   }
    // });
    // if (entregasMotorista.count >= 2) {
    //   const error = new Error('O motorista já fez 2 entregas este mês.');
    //   error.status = 400;
    //   throw error;
    // }

    // const entregasMotoristaNordeste = await entregaService.count({ 
    //   where: { 
    //     motoristaId,
    //     regiao: 'Nordeste'
    //   }
    // });
    // if (entregasMotoristaNordeste.count >= 1) {
    //   const error = new Error('O motorista já fez uma entrega para o Nordeste.');
    //   error.status = 400;
    //   throw error;
    // }

    // Aplicação das taxas de região
    let valorFinal = valor;
    if (regiao === 'Nordeste') valorFinal *= 1.20;
    if (regiao === 'Argentina') valorFinal *= 1.40;
    if (regiao === 'Amazônia') valorFinal *= 1.30;

    // Indicadores
    let valiosa = false;
    if (valorFinal > 30000) {
      valiosa = true;
    }
    let perigosa = false;
    if (indicador_perigosa === 'Combustível') {
      perigosa = true;
    }

    const entregaUpdated = await entregaService.updateEntrega(id, {
      caminhaoId,
      motoristaId,
      tipo,
      valor: valorFinal,
      regiao,
      seguro,
      indicador_valiosa: valiosa,
      indicador_perigosa: perigosa,
      status
    });

    res.status(200).json(entregaUpdated);
  } catch (error) {
    next(error);
  }
};

const deleteEntrega = async (req, res, next) => {
  try {
    const { id } = req.params;
    const entrega = await entregaService.getEntregaById(id);
    if (!entrega) {
      const error = new Error('Entrega não encontrada');
      error.status = 404;
      throw error;
    }

    await entregaService.deleteEntrega(id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createEntrega,
  getEntregas,
  getEntregaById,
  updateEntrega,
  deleteEntrega
};
