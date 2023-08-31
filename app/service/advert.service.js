const db = require('../db');
const { QueryTypes } = require('sequelize');


module.exports = {
    findAllJoinUser,
    findOne,
    getAdvertToValidate,
    create,
    findAdvertCreated,
    findByTitle,
    findAdvertSelected,
    findAdvertByCategory,
    update,
    getGeo,
    delete: _delete
};


async function findAllJoinUser() {
    return await findAllJoinUser(
    );
}

async function findByTitle(advert_title) {
    return await findByTitle(advert_title)
}

async function findAdvertByCategory(category_id) {
    return await findAdvertByCategory(category_id)
}

async function findOne(advert_id) {
    return await getAdvert(advert_id);
}

async function findAdvertCreated(user_id_create) {
    return await getAdvert(user_id_create);
}
async function findAdvertSelected(user_id_select) {
    return await getAdvert(user_id_select);
}

async function getGeo(advert_longitude, advert_latitude) {
    return await getGeo(advert_longitude, advert_latitude)
}

async function create(params) {
    // function zipCodeValidation(code) {
    //     const zipCode = /^[0-9]{5}(?:-[0-9]{4})?$/
    //     if (code.match(zipCode)) { return true; }
    //     return false;
    // }
    // if (zipCodeValidation(params.advert_zip_code) == false) {
    //     throw "ce code postal n'est pas valide";
    // }
    return await db.Advert.create(params);
}

async function update(advert_id, params) {
    const advert = await getAdvert(advert_id);

    Object.assign(advert, params);
    await advert.save();
}

async function _delete(advert_id) {
    const advert = await getAdvert(advert_id);
    await advert.destroy();
}

// helper functions

async function getAdvert(advert_id) {
    const advert = await db.Advert.findByPk(advert_id);
    if (!advert) {throw 'advert not found';}
    return advert;
}

async function findAllJoinUser() {
    const users = await db.Advert.sequelize.query('SELECT advert_id, advert_title, advert_description, advert_active, adverts.createdAt, adverts.updatedAt, advert_archive, advert_selected, advert_address, advert_zip_code, advert_city, advert_department, advert_latitude, advert_longitude, category_id, user_id_create, user_id_select, user_pseudo, user_firstname, user_lastname FROM adverts inner join users on user_id_create = user_id', { type: QueryTypes.SELECT });
    return users
}

async function getGeo(advert_latitude, advert_longitude) {
    const geo = await db.Advert.sequelize.query(`SELECT advert_title, advert_id, ( 6371 * acos( cos( radians(${advert_latitude}) ) * cos( radians( advert_latitude ) ) 
    * cos( radians( advert_longitude ) - radians(${advert_longitude}) ) + sin( radians(${advert_latitude}) ) * sin(radians(advert_latitude)) ) ) AS distance 
    FROM adverts
    
` , { type: QueryTypes.SELECT })

    return geo
}
async function findAdvertCreated(user_id_create) {
    const adverts = await db.Advert.sequelize.query(`SELECT * FROM adverts inner join users on user_id_create = user_id where user_id_create = ${user_id_create}`, { type: QueryTypes.SELECT });
    return adverts
}
async function findAdvertSelected(user_id_select) {
    const adverts = await db.Advert.sequelize.query(`select * from adverts inner join users on user_id = user_id_select where user_id_select =${user_id_select}`, { type: QueryTypes.SELECT });
    return adverts
}

async function findByTitle(advert_title) {
    const title = await db.Advert.sequelize.query(`SELECT * FROM adverts WHERE advert_title LIKE '%${advert_title}%'`, { type: QueryTypes.SELECT })
    return title
}
async function findAdvertByCategory(category_id) {
    const categorie = await db.Advert.sequelize.query(`SELECT * FROM adverts where category_id =${category_id}`, { type: QueryTypes.SELECT })
    return categorie
}

async function getAdvertToValidate() {
    const advert = await db.Advert.sequelize.query('SELECT count(advert_id) as countadverts FROM adverts where advert_active = 0', { type: QueryTypes.SELECT })
    return advert
}

async function updateAdvertActive(advert_id, advert_active) {
    const active = await db.Advert.sequelize.query(`UPDATE adverts 
    set advert_active = ${advert_active}
    where advert_id = ${advert_id}`, { type: QueryTypes.UPDATE })
    return active
}
async function updateAdvertAchive(advert_id, advert_archive) {
    const archive = await db.Advert.sequelize.query(`UPDATE adverts 
    set advert_archive = ${advert_archive}
    where advert_id = ${advert_id}`, { type: QueryTypes.UPDATE })
    return archive
}
async function updateAdvertSelected(advert_id, advert_selected) {
    const selected = await db.Advert.sequelize.query(`UPDATE adverts 
    set advert_selected = ${advert_selected}
    where advert_id = ${advert_id}`, { type: QueryTypes.UPDATE })
    return selected
}