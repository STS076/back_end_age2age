const db = require("../db");
const { QueryTypes } = require("sequelize");

module.exports = {
    findAll,
    findOne,
    findMessageSend,
    findMessageReceive,
    create,
    update,
    delete: _delete
};


async function findAll() {
    const message = await db.Messages.sequelize.query("select message_body, message_send_date, message_id, user_id_send, user_id_receive, s.user_firstname as firstnameSend, s.user_lastname as lastnameSend, r.user_firstname as firstnameReceive, r.user_lastname as lastnameReceive  from messages inner join users s on user_id_send = s.user_id  inner join users r on user_id_receive = r.user_id", { type: QueryTypes.SELECT });
    return message
}

async function findOne(message_id) {
    return await getMessage(message_id);
}

async function findMessageSend(user_id_send) {
    return await getMessagesend(user_id_send);
}

async function findMessageReceive(user_id_receive) {
    return await getMessageReceive(user_id_receive);
}

async function create(params) {

    await db.Messages.create(params);

}

async function update(message_id, params) {
    const message = await getMessage(message_id);

    Object.assign(message, params);
    await message.save();
}

async function _delete(message_id) {
    const message = await getMessage(message_id);
    await message.destroy();
}

// helper functions

async function getMessage(message_id) {
    const message = await db.Messages.findByPk(message_id);
    if (!message) {throw "message not found";}
    return message;
}

async function getMessagesend(user_id_send) {
    const message = await db.Messages.sequelize.query(`select * from messages inner join users on user_id_send = user_id where user_id_send =  ${user_id_send}`, { type: QueryTypes.SELECT });
    if (!message) {throw "User not found";}
    return message
}

async function getMessageReceive(user_id_receive) {
    const message = await db.Messages.sequelize.query(`select * from messages inner join users on user_id_receive = user_id where user_id_receive =  ${user_id_receive}`, { type: QueryTypes.SELECT });
    if (!message) {throw "User not found";}
    return message
}

