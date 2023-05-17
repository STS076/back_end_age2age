const db = require('../db');
const sequelize = require('sequelize');
const { QueryTypes } = require('sequelize');

module.exports = {
    findAll,
    findOne,
    getCommentReceive,
    getCommentSend,
    getCommentToValidate,
    create,
    update,
    delete: _delete
};

async function findAll() {
    return await getAllCommentUser();
}

async function findOne(comment_id) {
    return await getComment(comment_id);
}

async function getCommentToValidate() {
    return await getCommentToValidate()
}

async function getCommentSend(user_id_send) {
    return await getCommentSend(user_id_send);
}

async function getCommentReceive(user_id_receive) {
    return await getCommentReceive(user_id_receive);
}

async function create(params) {

    await db.Comments.create(params);

}

async function update(comment_id, params) {
    const comment = await getComment(comment_id);

    Object.assign(comment, params);
    await comment.save();
}

async function _delete(comment_id) {
    const comment = await getComment(comment_id);
    await comment.destroy();
}

// helper functions

async function getAllCommentUser() {
    const comments = await db.Comments.sequelize.query(`select * from comments inner join users on user_id_send = user_id`, { type: QueryTypes.SELECT });
    return comments
}


async function getComment(comment_id) {
    const comment = await db.Comments.findByPk(comment_id);
    if (!comment) throw 'comment not found';
    return comment;
}


async function getCommentSend(user_id_send) {
    const comment = await db.Comments.sequelize.query(`select * from comments inner join users on user_id_send = user_id where user_id_send =  ${user_id_send}`, { type: QueryTypes.SELECT });
    if (!comment) throw 'User not found';
    return comment
}

async function getCommentReceive(user_id_receive) {
    const comment = await db.Comments.sequelize.query(`select * from comments inner join users on user_id_receive = user_id where user_id_receive =  ${user_id_receive}`, { type: QueryTypes.SELECT });
    if (!comment) throw 'User not found';
    return comment
}

async function getCommentToValidate() {
    const comment = await db.Comments.sequelize.query(`SELECT count(comment_id) as countcomments FROM comments where comment_active = 0`, { type: QueryTypes.SELECT })
    return comment
}
