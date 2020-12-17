const TaskModel = require('../models/TaskModel');
const { isPast } = require('date-fns');

const TaskMiddleware = async(req, res, next) => {
  
    const { macAddress, title, description, when } = req.body;
    
    if (!macAddress){
        return res.status(400).json({ error: 'Mac Address é obrigatório!' });
    } else if (!title){
        return res.status(400).json({ error: 'Title é obrigatório!' });
    } else if (!description){
        return res.status(400).json({ error: 'Descrição é obrigatório!' });
    } else if (!when){
        return res.status(400).json({ error: 'Data e Hora são obrigatórios!' });
    } else if (isPast(new Date(when))){
        return res.status(400).json({ error: 'Data inválida!' });
    } else {

        let exists;

        if(req.params.id){
            exists = await TaskModel.findOne({
                '_id': {'$ne': req.params.id},
                'when': {'$eq': new Date(when)},
                'macAddress': {'$in': macAddress},
            });
        } else {
            exists = await TaskModel.findOne({
                'when': {'$eq': new Date(when)},
                'macAddress': {'$in': macAddress},
            });
        }

        if(exists){
            return res.status(400).json({ error: 'Já existe uma tarefa cadastrada neste horário!' });
        }

        next();
    }

};

module.exports = TaskMiddleware;
