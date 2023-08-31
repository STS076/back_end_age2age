const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('../../_middleware/validate-request');
const commentService = require('../service/comment.service');
const { QueryTypes } = require('sequelize');
const authorize = require('../../_middleware/authorize')

router.post('/', authorize(), registerSchema, create);
router.get('/', authorize(), findAll);
router.get('/comment/validate', getCommentToValidate)
router.get('/:comment_id', authorize(), findOne);
router.get('/user/send/:user_id_send', authorize(), getCommentSend);
router.get('/user/receive/:user_id_receive', getCommentReceive);
router.put('/:comment_id', authorize(), updateSchema, update);
router.delete('/:comment_id', authorize(), _delete);

module.exports = router;

function registerSchema(req, res, next) {
    const schema = Joi.object({
        // comment_id: (Joi),
        comment_rating: (Joi.number()),
        comment_description: (Joi.string()),
        comment_posted_on: (Joi.date()),
        comment_active: (Joi.boolean()),
        user_id_send: (Joi.number()),
        user_id_receive: (Joi.number()),
    });
    validateRequest(req, next, schema);
}

function create(req, res, next) {
    commentService.create(req.body)
        .then(() => res.json({ message: 'comment créé' }))
        .catch(next);
};

function getCommentToValidate(req, res, next){
    commentService.getCommentToValidate()
    .then(comment => res.json(comment))
    .catch(next);
}

function findAll(req, res, next) {
    commentService.findAll()
        .then(comment => res.json(comment))
        .catch(next);
};

function findOne(req, res, next) {
    commentService.findOne(req.params.comment_id)
        .then(comment => res.json(comment))
        .catch(next);
};


function getCommentReceive(req, res, next) {
    commentService.getCommentReceive(req.params.user_id_receive)
        .then(commentreceive => res.json(commentreceive))
        .catch(next);
};

function getCommentSend(req, res, next) {
    commentService.getCommentSend(req.params.user_id_send)
        .then(commentSend => res.json(commentSend))
        .catch(next);
};



function updateSchema(req, res, next) {
    const schema = Joi.object({
        comment_rating: (Joi.number()).empty(''),
        comment_description: (Joi.string()).empty(''),
        comment_active: Joi.boolean().empty(''),
        user_id_receive: (Joi).number().empty(''),
    });
    validateRequest(req, next, schema);
}

function update(req, res, next) {
    commentService.update(req.params.comment_id, req.body)
        .then(role => res.json(role))
        .catch(next);
};

function _delete(req, res, next) {
    commentService.delete(req.params.comment_id)
        .then(() => res.json({ message: 'commentaire supprimé' }))
        .catch(next);
};