"use strict";

const express       = require('express');
const route         = express.Router();

route.use('/need-to-purchase', require('./need-to-purchase/need-to-purchase.controller'));
route.use('/need-to-purchase-situation', require('./need-to-purchase-situation/need-to-purchase-situation.controller'));
route.use('/product', require('./product/product.controller'));
route.use('/provider', require('./provider/provider.controller'));
route.use('/purchase', require('./purchase/purchase.controller'));
route.use('/purchase-situation', require('./purchase-situation/purchase-situation.controller'));
route.use('/quotation', require('./quotation/quotation.controller'));
route.use('/quotation-provider', require('./quotation-provider/quotation-provider.controller'));
route.use('/quotation-situation', require('./quotation-situation/quotation-situation.controller'));
route.use('/system-user', require('./system-user/system-user.controller'));

module.exports = route;