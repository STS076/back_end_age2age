const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('../../_middleware/validate-request');
const roleService = require('../service/role.service');
const { QueryTypes } = require('sequelize');
const authorize = require('../../_middleware/authorize')

router.post('/', authorize(), registerSchema, create);
router.get('/', authorize(), findAll);
router.get('/:role_id', findOne);
router.put('/:role_id', authorize(), updateSchema, update);
router.delete('/:role_id', authorize(), _delete);

module.exports = router;

function registerSchema(req, res, next) {
    const schema = Joi.object({
        role_type: (Joi.string()),
    });
    validateRequest(req, next, schema);
}

function create(req, res, next) {
    roleService.create(req.body)
        .then(() => res.json({ message: 'role créé' }))
        .catch(next);

}

function findAll(req, res, next) {
    roleService.findAll()
        .then(role => res.json(role))
        .catch(next);
}

function findOne(req, res, next) {
    roleService.findOne(req.params.role_id)
        .then(role => res.json(role))
        .catch(next);
}

function updateSchema(req, res, next) {
    const schema = Joi.object({
        role_type: (Joi.string()).empty(''),
    });
    validateRequest(req, next, schema);
}

function update(req, res, next) {
    roleService.update(req.params.role_id, req.body)
        .then(role => res.json(role))
        .catch(next);
}

function _delete(req, res, next) {
    roleService.delete(req.params.role_id)
        .then(() => res.json({ message: 'role supprimé' }))
        .catch(next);
}