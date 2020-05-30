"use strict";

const businessRules = require('./purchase-order.business-rules');
const messageBus    = require('../../message-bus/message-bus');

messageBus.subscribe('purchase', (data) => {
    businessRules.insert(data);
});