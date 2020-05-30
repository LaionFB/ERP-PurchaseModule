"use strict";

const _             = require('lodash');
const repository    = require('./purchase-order.repository');
const messageBus    = require('../../message-bus/message-bus');
const businessRules = {};

businessRules.getAll = () => repository.getAll();

businessRules.getById = (id) => repository.getById(id);

businessRules.insert = (data) => {
    let obj = _.pick(data, ['productId', 'quantity', 'situationId']);
    obj.isDeleted = false;
    obj.situationId = 1;
    
    if(!obj.productId || isNaN(obj.productId) || obj.productId <= 0)
        throw new Error('Produto não encontrado.');
    if(!obj.quantity || isNaN(obj.quantity) || obj.quantity <= 0)
        throw new Error('Quantidade deve ser um valor positivo');

    return repository.insert(obj);
}

businessRules.update = async (data) => {
    let obj = _.pick(data, ['id', 'situationId']);
    
    if(!obj.id || isNaN(obj.id))
        throw new Error('Item não encontrado.');
    if(!obj.situationId || isNaN(obj.situationId) || obj.situationId <= 0)
        throw new Error('Situação não encontrada.');

    let result = await repository.update(obj);
    messageBus.sendMessage('PurchaseOrderUpdated', obj);
    return result;
}

businessRules.delete = (id) => {
    return repository.update({ id, isDeleted: true });
}

module.exports = businessRules;