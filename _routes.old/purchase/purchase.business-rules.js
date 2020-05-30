"use strict";

const repository                     = require('./purchase.repository');
const businessRules                  = {};
const quotationBusinessRules         = require('../quotation/quotation.business-rules');
const quotationProviderBusinessRules = require('../quotation-provider/quotation-provider.business-rules');

businessRules.getAll = () => repository.getAll();

businessRules.getById = (id) => repository.getById(id);

businessRules.getByCode = (code) => repository.getByCode(code);

businessRules.getByQuotationIdAndProviderId = (quotationId, providerId) => repository.getByQuotationIdAndProviderId(quotationId, providerId);

businessRules.insert = async (data) => {
    data.id = null;
    data.isDeleted = false;

    let quotation = await quotationBusinessRules.getById(data.quotationId);
    quotation.situationId = 2;//feito
    quotationBusinessRules.update(quotation);

    let quotationProvider = await quotationProviderBusinessRules.getByQuotationIdAndProviderId(data.quotationId, data.providerId);
    quotationProvider.situationId = 2;//feito
    quotationProviderBusinessRules.update(quotationProvider);

    return await repository.insert(data);
}

businessRules.update = async (data) => {
    let old = await businessRules.getById(data.id);

    old.situationId = data.situationId;

    return repository.update(old);
}

businessRules.delete = (id) => repository.delete(id);

module.exports = businessRules;