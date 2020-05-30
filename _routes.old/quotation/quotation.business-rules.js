"use strict";

const repository    = require('./quotation.repository');
const businessRules = {};

businessRules.getAll = () => repository.getAll();

businessRules.getById = (id) => repository.getById(id);

businessRules.getLate = () => repository.getLate();

businessRules.insert = async (data) => {
    data.id = null;
    data.isDeleted = false;
    return await repository.insert(data);
}

businessRules.update = async (data) => {
    let old = await businessRules.getById(data.id);

    old.situationId = data.situationId;

    return repository.update(old);
}

businessRules.delete = (id) => repository.delete(id);

module.exports = businessRules;