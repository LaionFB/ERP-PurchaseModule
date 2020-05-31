"use strict";

const messageBus    = require('./message-bus');

const purchaseOrderBusinessRules = require('../routes/purchase-order/purchase-order.business-rules');

let subscribe = () => {
    messageBus.subscribe('BuyProductEvent', async (data) => {
        return purchaseOrderBusinessRules.insert(data);
    });
}

module.exports = subscribe;