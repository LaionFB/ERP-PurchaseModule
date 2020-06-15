"use strict";

const _             = require('lodash');
const repository    = require('./provider-product.repository');
const businessRules = {};

businessRules.getProducts = (providerId) => repository.getById(providerId);

businessRules.getProviders = (productId) => repository.getById(productId);

businessRules.insert = (data) => {
    let obj = _.pick(data, ['productId', 'providerId']);
    
    if(!obj.id || isNaN(obj.productId))
        throw new Error('Produto não encontrado.');
        
    if(!obj.id || isNaN(obj.providerId))
        throw new Error('Fornecedor não encontrado.');

    return repository.insert(obj);
}

businessRules.delete = (providerId, productId) => {
    return repository.delete(providerId, productId);
}

module.exports = businessRules;