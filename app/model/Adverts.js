const { DataTypes } = require('sequelize');
// const htmlspecialchars = require('htmlspecialchars');

function adverts(sequelize) {
  const attributes = {
    advert_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    advert_title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    advert_description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    advert_active: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: new Date(),
      allowNull: true
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    advert_archive: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    advert_selected: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    advert_address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    advert_zip_code: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    advert_city: {
      type: DataTypes.STRING,
      allowNull: false
    },
    advert_department: {
      type: DataTypes.STRING,
      allowNull: false
    },
    advert_longitude: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    advert_latitude: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'categories',
        key: 'category_id'
      }
    },
    user_id_create: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'user_id'
      }
    },
    user_id_select: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'users',
        key: 'user_id'
      }
    },
  }
  return sequelize.define('adverts', attributes);

};

module.exports = adverts;