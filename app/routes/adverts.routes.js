module.exports = app => {
    const adverts = require("../controllers/adverts.controllers");

    // Create a new advert
    app.post("/adverts", adverts.create);

    // Retrieve all adverts
    app.get("/adverts", adverts.findAll);

    // Retrieve a single advert with advert_id
    app.get("/adverts/:advert_id", adverts.findOne);

    app.get("/adverts/category/:category_id", adverts.findByCategory);
    // Update a advert with advert_id
    app.put("/adverts/:advert_id", adverts.update);

    app.put("/adverts/status/:advert_id", adverts.updateActiveStatus);

    app.put("/adverts/archive/:advert_id", adverts.updateArchiveStatus);

    app.put("/adverts/selected/:advert_id", adverts.updateSelectedStatus);

    // Delete a advert with advert_id
    app.delete("/adverts/:advert_id", adverts.delete);

};
