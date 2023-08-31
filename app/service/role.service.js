const db = require('../db');

module.exports = {
    findAll,
    findOne,
    create,
    update,
    delete: _delete
};


async function findAll() {
    return await db.Roles.findAll();
}

async function findOne(role_id) {
    return await getRole(role_id);
}

async function create(params) {
    await db.Roles.create(params);
}

async function update(role_id, params) {
    const role = await getRole(role_id);

    Object.assign(role, params);
    await role.save();
}

async function _delete(role_id) {
    const role = await getRole(role_id);
    await role.destroy();
}

// helper functions

async function getRole(role_id) {
    const role = await db.Roles.findByPk(role_id);
    if (!role) {throw 'role not found';}
    return role;
}
