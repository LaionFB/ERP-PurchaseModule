"use strict";

const repository    = require('./need-to-purchase.repository');
const businessRules = {};

businessRules.getAll = () => repository.getAll();

businessRules.getById = (id) => repository.getById(id);

businessRules.getBySituationId = (situationId) => repository.getBySituationId(situationId);

businessRules.getLate = () => repository.getLate();

businessRules.insert = async (data) => {
    data.id = null;
    data.isDeleted = false;
    data.situationId = 1;

    if(!data.isAutomatic && !data.userId)
        throw new Error('User Id is required');

    if(data.quantity <= 0)
        throw new Error('Quantity must be greater than zero');

    if(new Date(data.limitDate) <= new Date())
        throw new Error('Limit date must be greater than current date');

    return repository.insert(data);
}

businessRules.update = async (data) => {
    let old = await businessRules.getById(data.id);

    old.situationId = data.situationId;

    return repository.update(old);
}

businessRules.delete = (id) => repository.delete(id);

module.exports = businessRules;