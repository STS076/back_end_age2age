const express = require("express");
const router = express.Router();
const Joi = require("joi");
const validateRequest = require("../../_middleware/validate-request");
const authorize = require("../../_middleware/authorize")
const userService = require("../service/user.service");

// routes
router.post("/authenticate", authenticateSchema, authenticate);
router.post("/register", registerSchema, register);
router.get("/", authorize(), getAll);
router.get("/:user_id", authorize(), getById);
router.get("/favourite/:user_id", authorize(), getUserFavourite);
router.get("/created/:user_id", authorize(), getAdvertCreatedByUser);
router.get("/selected/:user_id", authorize(), getAdvertsSelectedByUser);
router.get("/rating/:user_id", authorize(), getAverageRatingUser);
router.get("/userFavourite/:user_id", authorize(), getUserFavouriteAdverts);
router.get("/commentSend/:user_id", authorize(), getCommentUserSend);
router.get("/commentReceived/:user_id", authorize(), getCommentUserReceived);
router.get("/stats/getStats", getStats);
router.get("/rate/getAllRating/", authorize(), getAllRating);
router.put("/:user_id", authorize(), updateSchema, update);
router.put("/role/:user_id", authorize(), updateUserRole);
router.put("/status/:user_id", updateUserStatus);


router.delete("/:user_id", authorize(), _delete);

module.exports = router;

function authenticateSchema(req, res, next) {
    const schema = Joi.object({
        user_email_address: Joi.string().required(),
        user_password: Joi.string().required()
    });
    validateRequest(req, next, schema);
}

function authenticate(req, res, next) {
    userService.authenticate(req.body)
        .then(user => res.json(user))
        .catch(next);
}

function registerSchema(req, res, next) {
    const schema = Joi.object({
        user_firstname: (Joi.string()).required(),
        user_lastname: (Joi.string()).required(),
        user_phone_number: (Joi.string()).required(),
        user_email_address: (Joi.string()).required(),
        user_active: (Joi.boolean()).required(),
        createdAt: Joi.date(),
        updatedAt: Joi.date(),
        user_password: (Joi.string()).required(),
        user_pseudo: (Joi.string()).required(),
        user_address: (Joi.string()).required(),
        user_city: (Joi.string()).required(),
        user_zip_code: (Joi.string()).required(),
        user_department: (Joi.string()).required(),
        user_longitude: (Joi.number()),
        user_latitude: (Joi.number()),
        role_id: (Joi.number()).required()
    });
    validateRequest(req, next, schema);
}

function register(req, res, next) {
    userService.create(req.body)
        .then(() => res.json({ message: "Registration successful" }))
        .catch(next);
}

function getAll(req, res, next) {
    userService.getAll()
        .then(users => res.json(users))
        .catch(next);
}

function getAllRating(req, res, next) {
    userService.getAllRating()
        .then(rating => res.json(rating))
        .catch(next);
}
function getStats(req, res, next) {
    userService.getStats()
        .then(stats => res.json(stats))
        .catch(next);
}
function getById(req, res, next) {
    userService.getById(req.params.user_id)
        .then(user => res.json(user))
        .catch(next);

}
function getUserFavouriteAdverts(req, res, next) {
    userService.getUserFavouriteAdverts(req.params.user_id)
        .then(user => res.json(user))
        .catch(next);
}
function updateUserRole(req, res, next) {
    userService.updateUserRole(req.params.user_id, req.body.role_id)
        .then(role => res.json(role))
        .catch(next);
}

function updateUserStatus(req, res, next) {
    userService.updateUserStatus(req.params.user_id, req.body.user_active)
        .then(role => res.json(role))
        .catch(next);
}

function getUserFavourite(req, res, next) {
    userService.getUserFavourite(req.params.user_id)
        .then(user => res.json(user))
        .catch(next);
}
function getCommentUserSend(req, res, next) {
    userService.getCommentUserSend(req.params.user_id)
        .then(send => res.json(send))
        .catch(next);
}

function getCommentUserReceived(req, res, next) {
    userService.getCommentUserReceived(req.params.user_id)
        .then(receive => res.json(receive))
        .catch(next);
}

function getAverageRatingUser(req, res, next) {
    userService.getAverageRatingUser(req.params.user_id)
        .then(rating => res.json(rating))
        .catch(next);
}
function getAdvertsSelectedByUser(req, res, next) {
    userService.getAdvertsSelectedByUser(req.params.user_id)
        .then(selected => res.json(selected))
        .catch(next);
}
function getAdvertCreatedByUser(req, res, next) {
    userService.getAdvertCreatedByUser(req.params.user_id)
        .then(created => res.json(created))
        .catch(next);
}

function updateSchema(req, res, next) {
    const schema = Joi.object({
        user_firstname: (Joi.string()).empty(""),
        user_lastname: (Joi.string()).empty(""),
        user_phone_number: (Joi.string()).empty(""),
        user_email_address: (Joi.string()).empty(""),
        user_active: (Joi.boolean()).empty(""),
        user_password: (Joi.string()).empty(""),
        user_pseudo: (Joi.string()).empty(""),
        user_address: (Joi.string()).empty(""),
        user_city: (Joi.string()).empty(""),
        user_zip_code: (Joi.string()).empty(""),
        user_department: (Joi.string()).empty(""),
        user_longitude: (Joi.number()),
        user_latitude: (Joi.number()),
        role_id: (Joi.number()).empty("")
    });
    validateRequest(req, next, schema);
}

function update(req, res, next) {
    userService.update(req.params.user_id, req.body)
        .then(user => res.json(user))
        .catch(next);
}

function _delete(req, res, next) {
    userService.delete(req.params.user_id)
        .then(() => res.json({ message: "User deleted successfully" }))
        .catch(next);
}