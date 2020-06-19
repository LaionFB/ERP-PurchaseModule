"use strict";

const _                          = require('lodash');
const repository                 = require('./quotation.repository');
const messageBus                 = require('../../message-bus/message-bus');
const db        		         = require('../../database/sequelize');
const purchaseOrderBusinessRules = require('../purchase-order/purchase-order.business-rules');
const businessRules              = {};

businessRules.getAll = () => repository.getAll();

businessRules.getById = (id) => repository.getById(id);

businessRules.insert = async (data) => {
    const transaction = await sequelize.transaction();

    let obj = _.pick(data, ['purchaseOrderId', 'providerId']);
    obj.isDeleted = false;
    obj.quotationSituationId = 1;

    if(!obj.providerId || isNaN(obj.providerId) || obj.providerId <= 0)
        throw new Error('Fornecedor não encontrado.');
        
    let purchaseOrder = await purchaseOrderBusinessRules.getById(obj.purchaseOrderId);

    if(!purchaseOrder)
        throw new Error('Ordem de compra não encontrada.');

    obj.quantity  = purchaseOrder.quantity;
    obj.productId = purchaseOrder.productId;

    await purchaseOrderBusinessRules.updateToQuotation(obj.purchaseOrderId);

    return repository.insert(obj);
}

businessRules.update = async (data) => {
    let obj = _.pick(data, ['id', 'quotationSituationId']);
    
    if(!obj.id || isNaN(obj.id))
        throw new Error('Item não encontrado.');
    if(!obj.quotationSituationId || isNaN(obj.quotationSituationId) || obj.quotationSituationId <= 0)
        throw new Error('Situação não encontrada.');

    let original = await repository.getById(obj.id);
    if(original.quotationSituationId != 1 || obj.quotationSituationId != 2)
        throw new Error('Mudança de situação inválida.');

    obj.answerDate = new Date();
    obj.price = data.price;

    if(!obj.price || isNaN(obj.price) || obj.price <= 0)
        throw new Error('Preço deve ser um número positivo.');        

    return repository.update(obj);
}

businessRules.delete = (id) => {
    return repository.update({ id, isDeleted: true });
}


businessRules.getQuotationSituations = () => repository.getQuotationSituations();

businessRules.updateToPurchased = async (id) => {
    let original = await repository.getById(id);

    let samePurchaseOrder = await repository.getByPurchaseOrderId(original.purchaseOrderId);
    samePurchaseOrder = samePurchaseOrder.filter(x => x.id != original.id);

    await Promise.all(samePurchaseOrder.map(x => repository.update({ id: x.id, quotationSituationId: 4 })));

    await purchaseOrderBusinessRules.updateToAwaitingDelivery(original.purchaseOrderId);

    return repository.update({ id: id, quotationSituationId: 5 });
}

module.exports = businessRules;