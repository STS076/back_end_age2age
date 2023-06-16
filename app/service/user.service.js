var { secret } = "secret";
try{
    var { secret } = require('../config/db.config.json') 
}catch(e){
}
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../db');
const htmlspecialchars = require('htmlspecialchars');
const { QueryTypes } = require('sequelize');

module.exports = {
    authenticate,
    getAll,
    getById,
    create,
    phoneValidation,
    findEmail,
    getUserFavourite,
    getAverageRatingUser,
    getAdvertsSelectedByUser,
    getAdvertCreatedByUser,
    getCommentUserReceived,
    getUserFavouriteAdverts,
    updateUserRole,
    getCommentUserSend,
    updateUserStatus,
    update,
    getAllRating,
    getStats,
    delete: _delete
};

async function authenticate({ user_email_address, user_password }) {
    const user = await db.User.scope('withHash').findOne({ where: { user_email_address } });

    if (!user || !(await bcrypt.compare(user_password, user.user_password)))
        throw 'user_password or user_password is incorrect';

    // authentication successful
    const token = jwt.sign({ sub: user.user_id }, secret, { expiresIn: '7d' });
    return { ...omitHash(user.get()), token };
}

async function getAll() {
    return await db.User.findAll();
}

async function getAllRating() {
    return await getAllRating()
}

async function getStats() {
    return await getStats()
}

async function getById(user_id) {
    return await getById(user_id);
}

async function getUserFavourite(user_id) {
    return await getUserFavourite(user_id)
}

async function updateUserRole(user_id, role_id) {
    return await updateUserRole(user_id, role_id)
}

async function updateUserStatus(user_id, user_active) {
    return await updateUserStatus(user_id, user_active)
}

async function getUserFavouriteAdverts(user_id) {
    return await getUserFavouriteAdverts(user_id)
}

async function getAdvertCreatedByUser(user_id) {
    return await getAdvertCreatedByUser(user_id)
}

async function getAdvertsSelectedByUser(user_id) {
    return await getAdvertsSelectedByUser(user_id)
}

async function getAverageRatingUser(user_id) {
    return await getAverageRatingUser(user_id)
}

function phoneValidation(phone) {
    const phoneNumber = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    if (phone.match(phoneNumber)) { return true; }
    return false;
}
async function findEmail(email) {
    while(db.User == null) {
        await new Promise(resolve => setTimeout(resolve, 100));
    }

    if (await db.User.findOne({ where: { user_email_address: email } })) {
        return true
    }
    return false
}
async function create(params) {
    function emailValidation(email) {
        const emailFormat = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
        if (email.match(emailFormat)) { return true; }
        return false;
    }
    function nameValidation(name) {
        const validation = /^[a-zA-Z-éèëêâäàöôûùüîïç]+$/
        if (name.match(validation)) { return true; }
        return false;
    }


    if (emailValidation(params.user_email_address) == false) {
        throw 'this email address is invalid';
    }

    if (phoneValidation(params.user_phone_number) == false) {
        throw 'this phone number address is invalid';
    }

    if (await db.User.findOne({ where: { user_pseudo: params.user_pseudo } })) {
        throw 'this username "' + params.user_pseudo + '" is already taken';
    }
    if (await db.User.findOne({ where: { user_email_address: params.user_email_address } })) {
        throw 'this email address "' + params.user_email_address + '" is already taken';
    }
    if (await db.User.findOne({ where: { user_phone_number: params.user_phone_number } })) {
        throw 'this phone number "' + params.user_phone_number + '" is already taken';
    }

    // hash user_password
    if (params.user_password) {
        params.user_password = await bcrypt.hash(params.user_password, 10);
    }

    // save user
    await db.User.create(params);
}

async function update(user_id, params) {
    const user = await getUser(user_id);

    function emailValidation(email) {
        const emailFormat = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
        if (email.match(emailFormat)) { return true; }
        return false;
    }

    function phoneValidation(phone) {
        const phoneNumber = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
        if (phone.match(phoneNumber)) { return true; }
        return false;
    }

    const user_pseudoChanged = params.user_pseudo && user.user_pseudo !== params.user_pseudo;
    if (user_pseudoChanged && await db.User.findOne({ where: { user_pseudo: params.user_pseudo } })) {
        throw 'this username "' + params.user_pseudo + '" is already taken';
    }

    const user_emailChanged = params.user_email_address && user.user_email_address !== params.user_email_address;
    if (user_emailChanged && await db.User.findOne({ where: { user_email_address: params.user_email_address } })) {
        throw 'this email address "' + params.user_email_address + '" is already taken';
    }

    const user_phoneChanged = params.user_phone_number && user.user_phone_number !== params.user_phone_number;
    if (user_phoneChanged && await db.User.findOne({ where: { user_phone_number: params.user_phone_number } })) {
        throw 'this phone number "' + params.user_phone_number + '" is already taken';
    }

    if (emailValidation(params.user_email_address) == false) {
        throw 'this email address is invalid';
    }

    if (phoneValidation(params.user_phone_number) == false) {
        throw 'this phone number address is invalid';
    }

    if (params.user_password) {
        params.user_password = await bcrypt.hash(params.user_password, 10);
    }
    Object.assign(user, params);
    await user.save()

    return omitHash(user.get());
}

async function _delete(user_id) {
    const user = await getById(user_id);
    await user.destroy();
}

// helper functions
async function getUser(user_id) {
    const user = await db.User.findByPk(user_id);
    if (!user) throw 'advert not found';
    return user;
}

async function getUserFavourite(user_id) {
    const user = await db.User.sequelize.query(`select 
    group_concat(advert_title separator ',') as FavouriteAdvert
    from users 
    natural join user_has_favourites 
    inner join adverts on user_has_favourites.advert_id = adverts.advert_id
    where users.user_id = ${user_id}
    group by users.user_id `, { type: QueryTypes.SELECT });
    if (!user) throw 'User not found';
    return user
}

async function getById(user_id) {
    const user = await db.User.sequelize.query(`SELECT * FROM users inner join roles on users.role_id = roles.role_id where users.user_id = ${user_id}`, { type: QueryTypes.SELECT });
    if (!user) throw 'User not found';
    return Object.assign({}, user)
}

// statistics functions
async function getAdvertCreatedByUser(user_id) {
    const user = await db.User.sequelize.query(`select count(user_id_create) as created from users inner join adverts on user_id_create = user_id where user_id = ${user_id}`, { type: QueryTypes.SELECT });
    if (!user) throw 'User not found';
    return Object.assign({}, user)
}
async function getAdvertsSelectedByUser(user_id) {
    const user = await db.User.sequelize.query(`select count(user_id_select)  as selected from users inner join adverts on user_id_select = user_id where user_id = ${user_id}`, { type: QueryTypes.SELECT });
    if (!user) throw 'User not found';
    return Object.assign({}, user)
}
async function getAverageRatingUser(user_id) {
    const user = await db.User.sequelize.query(`select avg(comment_rating) as average from users inner join comments on user_id_receive = user_id where user_id = ${user_id}`, { type: QueryTypes.SELECT });
    if (!user) throw 'User not found';
    return Object.assign({}, user)
}

async function getCommentUserSend(user_id) {
    const user = await db.User.sequelize.query(`select * from users inner join comments on user_id_send = user_id where user_id = ${user_id}`, { type: QueryTypes.SELECT });
    if (!user) throw 'User not found';
    return user
}

async function getCommentUserReceived(user_id) {
    const user = await db.User.sequelize.query(`select * from users inner join comments on user_id_receive = user_id where user_id =  ${user_id}`, { type: QueryTypes.SELECT });
    if (!user) throw 'User not found';
    return user
}

async function getUserFavouriteAdverts(user_id) {
    const user = await db.User.sequelize.query(`SELECT * FROM users inner join user_has_favourites 
    on users.user_id = user_has_favourites.user_id 
    inner join adverts on user_has_favourites.advert_id = adverts.advert_id
    where users.user_id =  ${user_id}`, { type: QueryTypes.SELECT });
    if (!user) throw 'User not found';
    return user
}

async function updateUserRole(user_id, role_id) {
    const role = await db.User.sequelize.query(`UPDATE users 
    set role_id=${role_id}
    where user_id=${user_id}`, { type: QueryTypes.UPDATE })
    return role
}

async function updateUserStatus(user_id, user_active) {
    const status = await db.User.sequelize.query(`UPDATE users 
    set user_active = ${user_active}
    where user_id=${user_id}`, { type: QueryTypes.UPDATE })
    return status
}

async function getAllRating() {
    const rating = await db.User.sequelize.query(`select avg(comment_rating) as rating , user_id from users 
    left join comments 
    on user_id = user_id_receive  
    group by users.user_id`, { type: QueryTypes.SELECT })
    return rating
}

async function getStats() {
    const stats = await db.User.sequelize.query(`
    SELECT
    user_stats.user_id,
    user_stats.user_pseudo,
    user_stats.CREATED,
    user_stats.SELECTED,
    user_stats.user_lastname, 
    user_stats.user_firstname,
    user_stats.user_active,
    comment_stats.RATING
    FROM (
    SELECT users.user_id, users.user_pseudo, users.user_firstname, users.user_lastname, users.user_active, COUNT(adverts.user_id_create) AS CREATED, COUNT(adverts.user_id_select) AS SELECTED
    FROM adverts INNER JOIN users ON users.user_id = adverts.user_id_create
    GROUP BY users.user_id
    ) AS user_stats LEFT JOIN (
    SELECT AVG(comments.comment_rating) AS RATING, comments.user_id_receive AS user_id
    FROM users LEFT JOIN comments ON users.user_id = comments.user_id_receive
    GROUP BY users.user_id
    ) AS comment_stats ON user_stats.user_id = comment_stats.user_id
    `, { type: QueryTypes.SELECT })
    return stats
}



function omitHash(user) {
    const { hash, ...userWithoutHash } = user;
    return userWithoutHash;
}