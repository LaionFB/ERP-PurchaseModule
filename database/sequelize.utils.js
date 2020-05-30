"use strict";

let utils = {};

utils.afterFindOne = (result) => result && result.dataValues;
utils.afterFindAll = (result) => result.map(utils.afterFindOne);
utils.afterInsert  = (result) => result.dataValues.id;
utils.afterUpdate  = (result) => result[0];
utils.whereFindAll = { where: { isDeleted: false } };

module.exports = utils;