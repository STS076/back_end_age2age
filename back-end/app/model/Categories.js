const { DataTypes } = require('sequelize');
// const htmlspecialchars = require('htmlspecialchars');

module.exports = categories;

function categories(sequelize) {

  const attributes = {
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      autoIncrement: true
    },
    category_type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    category_active: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
  };
  return sequelize.define('categories', attributes);
};
