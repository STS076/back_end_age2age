const db = require('../db');

module.exports = {
    findAll,
    findOne,
    create,
    update,
    delete: _delete
};


async function findAll() {
    return await db.Categories.findAll();
}

async function findOne(category_id) {
    return await getCategory(category_id);
}

async function create(params) {

    await db.Categories.create(params);

}

async function update(category_id, params) {
    const category = await getCategory(category_id);

    Object.assign(category, params);
    await category.save();

}

async function _delete(category_id) {
    const category = await getCategory(category_id);
    await category.destroy();
}

// helper functions

async function getCategory(category_id) {
    const category = await db.Categories.findByPk(category_id);
    if (!category) throw 'category not found';
    return category;
}

