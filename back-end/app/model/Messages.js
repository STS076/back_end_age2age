const { DataTypes } = require('sequelize');
// const htmlspecialchars = require('htmlspecialchars');

module.exports = messages;

function messages(sequelize) {

  const attributes = {
    message_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    message_body: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    message_send_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    user_id_send: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'user_id'
      }
    },
    user_id_receive: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'user_id'
      }
    }
  };
  return sequelize.define('messages', attributes);
}



