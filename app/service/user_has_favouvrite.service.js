const db = require("../db");

module.exports = {
    create,
    delete: _deleteAdvert,
};


async function create(params) {
    await db.User_has_favourite.create(params);

}

async function _deleteAdvert(advert_id) {
    const userPost = await getAdvert(advert_id);
    await userPost.destroy();
}


// helper functions

async function getAdvert(advert_id) {
    const userPost = await db.User_has_favourite.findByPk(advert_id);
    if (!userPost) {throw "userPost not found";}
    return userPost;
}

