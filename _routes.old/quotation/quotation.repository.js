"use strict";

const Model      = require('./quotation.model');
const { Op }     = require("sequelize");
const repository = {};

repository.getAll = () => Model.findAll({ where: { isDeleted: false } }).then(result => result.map(item => item.dataValues));

repository.getById = (id) => Model.findByPk(id).then(result => result && result.dataValues);

repository.getLate = () => Model.findAll({ where: { limitDate: { [Op.lt]: new Date() } } });

repository.insert = (data) => Model.create(data).then(result => result.dataValues.id);

repository.update = (data) => Model.update(data, { where: { id: data.id } }).then(result => result[0]);

repository.delete = (id) => Model.update({ isDeleted: true }, { where: { id: id } });

module.exports = repository;