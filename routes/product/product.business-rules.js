"use strict";

const _             = require('lodash');
const repository    = require('./product.repository');
const businessRules = {};

businessRules.getAll = () => repository.getAll();

businessRules.getById = (id) => repository.getById(id);

businessRules.insert = (data) => {
    let obj = _.pick(data, ['name', 'price']);
    obj.isDeleted = false;
    
    if(!obj.name || obj.name.length < 2)
        throw new Error('Nome deve ter ao menos 2 caracteres.');
    if(!obj.price || isNaN(obj.price) || obj.price <= 0)
        throw new Error('Preço deve ser um valor positivo');

    return repository.insert(obj);
}

businessRules.update = (data) => {
    let obj = _.pick(data, ['id', 'name', 'price']);
    
    if(!obj.id || isNaN(obj.id))
        throw new Error('Item não encontrado.');
    if(!obj.name || obj.name.length < 2)
        throw new Error('Nome deve ter ao menos 2 caracteres.');
    if(!obj.price || isNaN(obj.price) || obj.price <= 0)
        throw new Error('Preço deve ser um valor positivo');

    return repository.update(obj);
}

businessRules.delete = (id) => {
    return repository.update({ id, isDeleted: true });
}

module.exports = businessRules;