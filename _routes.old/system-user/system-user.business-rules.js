"use strict";

const repository    = require('./system-user.repository');
const businessRules = {};

businessRules.getAll = () => repository.getAll();

businessRules.getById = (id) => repository.getById(id);

businessRules.insert = async (data) => {
    data.id = null;
    data.isDeleted = false;
    return await repository.insert(data);
}

businessRules.update = (data) => repository.update(data);

businessRules.delete = (id) => repository.delete(id);

module.exports = businessRules;