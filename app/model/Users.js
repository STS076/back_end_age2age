const { DataTypes } = require('sequelize');
const sequelize = require('sequelize')
// const htmlspecialchars = require('htmlspecialchars');

module.exports = users;

function users(sequelize) {

  const attributes = {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      autoIncrement: true

    },
    user_firstname: {
      type: DataTypes.STRING,
      allowNull: false,

    },
    user_lastname: {
      type: DataTypes.STRING,
      allowNull: false

    },
    user_phone_number: {
      type: DataTypes.INTEGER,
      allowNull: false

    },
    user_email_address: {
      type: DataTypes.STRING,
      allowNull: false

    },
    user_active: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    user_password: {
      type: DataTypes.STRING,
      allowNull: false

    },
    user_pseudo: {
      type: DataTypes.STRING,
      allowNull: false

    },
    user_address: {
      type: DataTypes.STRING,
      allowNull: false

    },
    user_city: {
      type: DataTypes.STRING,
      allowNull: false

    },
    user_zip_code: {
      type: DataTypes.INTEGER,
      allowNull: false

    },
    user_department: {
      type: DataTypes.STRING,
      allowNull: false

    },
    user_longitude: {
      type: DataTypes.DOUBLE,
      allowNull: true,

    },
    user_latitude: {
      type: DataTypes.DOUBLE,
      allowNull: true

    },
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'roles',
        key: 'role_id'
      }
    },

  }
  const options = {
    defaultScope: {
      // exclude hash by default
      attributes: { exclude: [] }
    },
    scopes: {
      // include hash with this scope
      withHash: { attributes: {}, }
    },

  };

  return sequelize.define('users', attributes, options);

}


