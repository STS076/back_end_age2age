const express = require("express");
const router = express.Router();
const Joi = require("joi");
const validateRequest = require("../../_middleware/validate-request");
const messageService = require("../service/message.service");
const { QueryTypes } = require("sequelize");
const authorize = require("../../_middleware/authorize")

router.post("/", authorize(), registerSchema, create);
router.get("/", authorize(), findAll);
router.get("/:message_id", authorize(), findOne);
router.get("/user/receive/:user_id_receive", authorize(), findMessageReveive);
router.get("/user/send/:user_id_send", authorize(), findMessageSend);
router.put("/:message_id", authorize(), updateSchema, update);
router.delete("/:message_id", authorize(), _delete);

module.exports = router;

function registerSchema(req, res, next) {
    const schema = Joi.object({
        message_id: (Joi.number()),
        message_body: (Joi.string()),
        message_send_date: (Joi.date()),
        user_id_send: (Joi.number()),
        user_id_receive: (Joi.number()),
    });
    validateRequest(req, next, schema);
};

function create(req, res, next) {
    messageService.create(req.body)
        .then(() => res.json({ message: "message créé" }))
        .catch(next);
};

function findAll(req, res, next) {
    messageService.findAll()
        .then(message => res.json(message))
        .catch(next);
};

function findOne(req, res, next) {
    messageService.findOne(req.params.message_id)
        .then(message => res.json(message))
        .catch(next);
};

function findMessageSend(req, res, next) {
    messageService.findMessageSend(req.params.user_id_send)
        .then(messageSend => res.json(messageSend))
        .catch(next);
};

function findMessageReveive(req, res, next) {
    messageService.findMessageReceive(req.params.user_id_receive)
        .then(messageReceive => res.json(messageReceive))
        .catch(next);
};

function updateSchema(req, res, next) {
    const schema = Joi.object({
        message_id: (Joi.number()).empty(""),
        message_body: (Joi.string()).empty(""),
        message_send_date: (Joi.date()).empty(""),
        user_id_send: (Joi.number()).empty(""),
        user_id_receive: (Joi.number()).empty(""),
    });
    validateRequest(req, next, schema);
};

function update(req, res, next) {
    messageService.update(req.params.message_id, req.body)
        .then(message => res.json(message))
        .catch(next);
}

function _delete(req, res, next) {
    messageService.delete(req.params.message_id)
        .then(() => res.json({ message: "message supprimé" }))
        .catch(next);
}