"use strict";

const _             = require('lodash');
const repository    = require('./provider-product.repository');
const businessRules = {};

businessRules.insert = (data) => {
    let obj = _.pick(data, ['productId', 'providerId']);
    
    if(!obj.productId || isNaN(obj.productId))
        throw new Error('Produto não encontrado.');
        
    if(!obj.providerId || isNaN(obj.providerId))
        throw new Error('Fornecedor não encontrado.');

    return repository.insert(obj);
}

businessRules.delete = (providerId, productId) => {
    return repository.delete(providerId, productId);
}

module.exports = businessRules;