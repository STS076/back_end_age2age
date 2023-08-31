const { DataTypes } = require("sequelize");

module.exports = user_has_favourite;

function user_has_favourite(sequelize) {

  const attributes = {
    advert_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: "adverts",
        key: "advert_id"
      }
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: "users",
        key: "user_id"
      }
    },
  };
  return sequelize.define("user_has_favourite", attributes);
};