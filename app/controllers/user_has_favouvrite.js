const express = require("express");
const router = express.Router();
const Joi = require("joi");
const validateRequest = require("../../_middleware/validate-request");
const userHasFavourite = require("../service/user_has_favouvrite.service");
const { QueryTypes } = require("sequelize");
const authorize = require("../../_middleware/authorize")

router.post("/", authorize(), registerSchema, create);
router.delete("/:advert_id", authorize(), _delete);

module.exports = router;

function registerSchema(req, res, next) {
    const schema = Joi.object({
        user_id: (Joi.number()),
        advert_id: (Joi.number()),
    });
    validateRequest(req, next, schema);
}

function create(req, res, next) {
    userHasFavourite.create(req.body)
        .then(userFavourite => res.json(userFavourite))
        .catch(next);

}

function _delete(req, res, next) {
    userHasFavourite.delete(req.params.advert_id, req.body.user_id)
        .then(() => res.json({ message: "userFavourite supprimé" }))
        .catch(next);
}

