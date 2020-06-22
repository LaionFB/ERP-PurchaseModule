"use strict";

const _                          = require('lodash');
const repository                 = require('./purchase.repository');
const messageBus                 = require('../../message-bus/message-bus');
const db        		         = require('../../database/sequelize');
const quotationBusinessRules     = require('../quotation/quotation.business-rules');
const purchaseOrderBusinessRules = require('../purchase-order/purchase-order.business-rules');
const businessRules              = {};

businessRules.getAll = () => repository.getAll();

businessRules.getById = (id) => repository.getById(id);

businessRules.insert = async (data) => {    let obj = _.pick(data, ['quotationId', 'expectedDeliveryDate']);
    obj.isDeleted = false;
    obj.purchaseSituationId = 1;

    if(!obj.expectedDeliveryDate || isNaN(new Date(obj.expectedDeliveryDate).getTime()) || new Date(obj.expectedDeliveryDate) < new Date())
        throw new Error('Informe uma data de entrega esperada válida e após a data atual.');

    let quotation = await quotationBusinessRules.getById(obj.quotationId);

    if(!quotation)
        throw new Error('Cotação não encontrada.');

    obj.price      = quotation.price;
    obj.quantity   = quotation.quantity;
    obj.productId  = quotation.productId;
    obj.providerId = quotation.providerId;

    await quotationBusinessRules.updateToPurchased(quotation.id);

    return repository.insert(obj);
}

businessRules.update = async (data) => {
    const transaction = await sequelize.transaction();
    
    let obj = _.pick(data, ['id', 'purchaseSituationId']);
    
    if(!obj.id || isNaN(obj.id))
        throw new Error('Item não encontrado.');
    if(!obj.purchaseSituationId || isNaN(obj.purchaseSituationId) || obj.purchaseSituationId <= 0)
        throw new Error('Situação não encontrada.');

    if(original.purchaseSituationId != 1 || obj.purchaseSituationId == 2)
        throw new Error('Mudança de situação inválida.');

    obj.deliveryDate = new Date();

    let original = await repository.getById(obj.id);
    let quotation = await quotationBusinessRules.getById(original.quotationId);
    await purchaseOrderBusinessRules.updateToDelivered(quotation.purchaseOrderId);

    return repository.update(obj);
}

businessRules.delete = (id) => {
    return repository.update({ id, isDeleted: true });
}


businessRules.getPurchaseSituations = () => repository.getPurchaseSituations();

module.exports = businessRules;