// const mysql = require("mysql");
const dbConfig = require("./config/db.config.json");

const mysql = require('mysql2');
const { Sequelize } = require('sequelize');

module.exports = db = {};

initialize();

async function initialize() {
  // create db if it doesn't already exist
  const { host, port, user, password, database } = dbConfig.database;
  const connection = mysql.createConnection({ host, user, password, database });
  connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);

  // connect to db
  const sequelize = new Sequelize(database, user, password, {
    dialect: 'mysql', define: {
      timestamps: false,
      createdAt: false,
      updatedAt: false,
      UserUserId: false,
    },
    port: port,
    host : host
  });

  // init models and add them to the exported db object
  db.User = require('./model/Users')(sequelize);
  db.Advert = require('./model/Adverts')(sequelize);
  db.Roles = require('./model/Roles')(sequelize);
  db.Categories = require('./model/Categories')(sequelize);
  db.Comments = require('./model/Comments')(sequelize);
  db.Messages = require('./model/Messages')(sequelize);
  db.User_has_favourite = require('./model/UserHasFavourite')(sequelize);



  // sync all models with database
  await sequelize.sync();
}
