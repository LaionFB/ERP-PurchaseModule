"use strict";

const _                          = require('lodash');
const repository                 = require('./situation.repository');
const messageBus                 = require('../../message-bus/message-bus');
const businessRules              = {};

businessRules.getPurchaseOrderSituations = () => repository.getPurchaseOrderSituations();

businessRules.getQuotationSituations = () => repository.getQuotationSituations();

businessRules.getPurchaseSituations = () => repository.getPurchaseSituations();

module.exports = businessRules;