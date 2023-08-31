const express = require("express");
const router = express.Router();
const Joi = require("joi");
const validateRequest = require("../../_middleware/validate-request");
const categoryService = require("../service/category.service");
const { QueryTypes } = require("sequelize");
const authorize = require("../../_middleware/authorize")

router.post("/", registerSchema, create);
router.get("/", findAll);
router.get("/:category_id", findOne);
router.put("/:category_id", authorize(), updateSchema, update);
router.delete("/:category_id", authorize(), _delete);

module.exports = router;

function registerSchema(req, res, next) {
    const schema = Joi.object({
        // category_id: ,
        category_type: (Joi.string()),
        category_active: Joi.boolean(),

    });
    validateRequest(req, next, schema);
}

function create(req, res, next) {
    categoryService.create(req.body)
        .then(() => res.json({ message: "category créée" }))
        .catch(next);

}

function findAll(req, res, next) {
    categoryService.findAll()
        .then(category => res.json(category))
        .catch(next);
}

function findOne(req, res, next) {
    categoryService.findOne(req.params.category_id)
        .then(category => res.json(category))
        .catch(next);
}

function updateSchema(req, res, next) {
    const schema = Joi.object({
        category_type: (Joi.string()).empty(""),
        category_active: (Joi.boolean()).empty(""),

    });
    validateRequest(req, next, schema);
}

function update(req, res, next) {
    categoryService.update(req.params.category_id, req.body)
        .then(category => res.json(category))
        .catch(next);
}

function _delete(req, res, next) {
    categoryService.delete(req.params.category_id)
        .then(() => res.json({ message: "category supprimé" }))
        .catch(next);
}