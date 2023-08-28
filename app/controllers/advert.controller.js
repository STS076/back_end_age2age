const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('../../_middleware/validate-request');
const advertService = require('../service/advert.service');
const { QueryTypes } = require('sequelize');
const authorize = require('../../_middleware/authorize')
const users = require('../model/Users');
const adverts = require('../model/Adverts');
const htmlspecialchars = require('htmlspecialchars');



router.post('/', registerSchema, create);
router.get('/', findAllJoinUser);
router.get('/testFunction', testFunction);
router.get('/:advert_id', findOne);
router.get('/advert/validate', getAdvertToValidate)
router.get('/advert/geo/:advert_longitude/:advert_latitude', getGeo);
router.get('/created/:user_id_create', authorize(), findAdvertCreated);
router.get('/title/:advert_title', findByTitle);
router.get('/category/:category_id', findAdvertByCategory);
router.get('/selected/:user_id_select', authorize(), findAdvertSelected);
router.put('/:advert_id', authorize(), updateSchema, update);
router.delete('/:advert_id', authorize(), _delete);

module.exports = router;

function testFunction(req, res, next) {
    res.json({ message: 'Ok 2' })

}

function registerSchema(req, res, next) {
    const schema = Joi.object({
        advert_id: Joi.number(),
        advert_title: Joi.string().required(),
        advert_description: (Joi.string()).required(),
        advert_active: Joi.boolean().required(),
        createdAt: Joi.date(),
        updatedAt: Joi.date(),
        advert_archive: Joi.boolean().required(),
        advert_selected: Joi.boolean().required(),
        advert_address: (Joi.string()).required(),
        advert_zip_code: Joi.number().required(),
        advert_city: (Joi.string()).required(),
        advert_department: (Joi.string()).required(),
        advert_longitude: (Joi.string()),
        advert_latitude: (Joi.string()),
        category_id: Joi.number().required(),
        user_id_create: Joi.number().required(),
        user_id_select: Joi.number(),
    });
    validateRequest(req, next, schema);
}

function create(req, res, next) {
    advertService.create(req.body)
        .then(adverts => res.json(adverts))
        .catch(next);
}

function getAdvertToValidate(req, res, next) {
    advertService.getAdvertToValidate()
        .then(advert => res.json(advert))
        .catch(next);
}

function findByTitle(req, res, next) {
    advertService.findByTitle(req.params.advert_title)
        .then(advert => res.json(advert))
        .catch(next);
}

function findAdvertByCategory(req, res, next) {
    advertService.findAdvertByCategory(req.params.category_id)
        .then(advert => res.json(advert))
        .catch(next);
}

function findAllJoinUser(req, res, next) {
    advertService.findAllJoinUser(
    )
        .then(adverts => res.json(adverts))
        .catch(next);
}

function findOne(req, res, next) {
    advertService.findOne(req.params.advert_id)
        .then(advert => res.json(advert))
        .catch(next);
};

function findAdvertCreated(req, res, next) {
    advertService.findAdvertCreated(req.params.user_id_create)
        .then(create => res.json(create))
        .catch(next);
};

function findAdvertSelected(req, res, next) {
    advertService.findAdvertSelected(req.params.user_id_select)
        .then(select => res.json(select))
        .catch(next);
};

function getGeo(req, res, next) {
    advertService.getGeo(req.params.advert_latitude, req.params.advert_longitude)
        .then(adverts => res.json(adverts))
        .catch(next);
}

function updateSchema(req, res, next) {
    const schema = Joi.object({
        advert_title: (Joi.string()).empty(''),
        advert_description: (Joi.string()).empty(''),
        advert_active: (Joi.boolean()).empty(''),
        updatedAt: Joi.date().empty(''),
        advert_archive: (Joi.boolean()).empty(''),
        advert_selected: (Joi.boolean()).empty(''),
        advert_address: (Joi.string()).empty(''),
        advert_zip_code: (Joi.string()).empty(''),
        advert_city: (Joi.string()).empty(''),
        advert_department: (Joi.string()).empty(''),
        advert_longitude: (Joi.number()).empty(''),
        advert_latitude: (Joi.number()).empty(''),
        category_id: (Joi.number()).empty(''),
        user_id_select: Joi.number().empty('')

    });
    validateRequest(req, next, schema);
}

function update(req, res, next) {
    advertService.update(req.params.advert_id, req.body)
        .then(adverts => res.json(adverts))
        .catch(next);
}

function _delete(req, res, next) {
    advertService.delete(req.params.advert_id)
        .then(() => res.json({ message: 'annonce supprimée' }))
        .catch(next);
}