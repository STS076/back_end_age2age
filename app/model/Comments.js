const { DataTypes } = require("sequelize");
// const htmlspecialchars = require('htmlspecialchars');

module.exports = comments;

function comments(sequelize) {

  const attributes = {
    comment_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      autoIncrement: true
    },
    comment_rating: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    comment_description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    comment_posted_on: {
      type: DataTypes.DATE,
      allowNull: true
    },
    comment_active: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    user_id_send: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "user_id"
      }
    },
    user_id_receive: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "user_id"
      }
    },
  };
  return sequelize.define("comments", attributes);
};