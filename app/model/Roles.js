const { DataTypes } = require('sequelize');

module.exports = roles;

function roles(sequelize) {

  const attributes = {
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      autoIncrement: true
    },
    role_type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  };
  return sequelize.define('roles', attributes);
};