"use strict";

const repository    = require('./quotation-provider.repository');
const businessRules = {};

businessRules.getAll = () => repository.getAll();

businessRules.getById = (id) => repository.getById(id);

businessRules.getByQuotationIdAndProviderId = (quotationId, providerId) => repository.getByQuotationIdAndProviderId(quotationId, providerId);

businessRules.insert = async (data) => {
    data.id = null;
    data.isDeleted = false;
    return await repository.insert(data);
}

businessRules.update = async (data) => {
    let old = await businessRules.getById(data.id);

    old.situationId = data.situationId;
    old.answerDate = data.answerDate;
    old.value = data.value;

    return repository.update(old);
}

businessRules.delete = (id) => repository.delete(id);

module.exports = businessRules;