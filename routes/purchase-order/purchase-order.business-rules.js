"use strict";

const _             = require('lodash');
const repository    = require('./purchase-order.repository');
const messageBus    = require('../../message-bus/message-bus');
const businessRules = {};

businessRules.getAll = () => repository.getAll();

businessRules.getById = (id) => repository.getById(id);

businessRules.insert = (data) => {
    let obj = _.pick(data, ['productId', 'quantity', 'purchaseOrderSituationId']);
    obj.isDeleted = false;
    obj.purchaseOrderSituationId = 1;

    if(!obj.productId || isNaN(obj.productId) || obj.productId <= 0)
        throw new Error('Produto não encontrado.');
    if(!obj.quantity || isNaN(obj.quantity) || obj.quantity <= 0)
        throw new Error('Quantidade deve ser um valor positivo');

    return repository.insert(obj);
}

businessRules.update = async (data) => {
    let obj = _.pick(data, ['id', 'purchaseOrderSituationId']);
    
    if(!obj.id || isNaN(obj.id))
        throw new Error('Item não encontrado.');
    if(!obj.purchaseOrderSituationId || isNaN(obj.purchaseOrderSituationId) || obj.purchaseOrderSituationId <= 0)
        throw new Error('Situação não encontrada.');

    let result = await repository.update(obj);

    if(obj.purchaseOrderSituationId == 4){
        let order = await businessRules.getById(obj.id);
        messageBus.sendMessage('productPurchasedEvent', { productId: order.productId, quantity: order.quantity });
    }
    return result;
}

businessRules.delete = (id) => {
    return repository.update({ id, isDeleted: true });
}


businessRules.getPurchaseOrderSituations = () => repository.getPurchaseOrderSituations();

module.exports = businessRules;