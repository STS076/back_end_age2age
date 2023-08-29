// const mysql = require("mysql");

const mysql = require('mysql2/promise');
const { Sequelize } = require('sequelize');
const sqlite = require('sqlite3');
module.exports = db = {};

initialize();

async function initialize() {

  var dbConfig = null
  try{
    dbConfig = require("./config/db.config.json");
  }catch(e){
  }

  var connection = null
  var sequelize = null
  if(dbConfig){
    // create db if it doesn't already exist
    const { host, port, user, password, database } = dbConfig.database;
    connection = await mysql.createConnection({ host, port, user, password });

    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);

    sequelize = new Sequelize(database, user, password, {
      dialect: 'mysql',
      host: host,
      define: {
        timestamps: false,
        createdAt: false,
        updatedAt: false,
        UserUserId: false,
      },
      port: port
    });

  }else{

    // use sqlite
    connection = new sqlite.Database('./db.sqlite');
    

    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: './db.sqlite',
      define: {
        timestamps: false,
      },
    });
    
    console.log("no db config")
  }

  // init models and add them to the exported db object
  db.User = require('./model/Users')(sequelize);
  db.Advert = require('./model/Adverts')(sequelize);
  db.Roles = require('./model/Roles')(sequelize);
  db.Categories = require('./model/Categories')(sequelize);
  db.Comments = require('./model/Comments')(sequelize);
  db.Messages = require('./model/Messages')(sequelize);
  db.User_has_favourite = require('./model/UserHasFavourite')(sequelize);
  
  // var roles = {
  //   1: 'userr',
  //   2: 'moderatorr',
  // }

  // for (var i in roles){
  //   var role = await db.Roles.findOne(i)
  //   if(!role){
  //     await db.Roles.create({role_type: roles[i]});
  //   }
  // }

  // var categories = {
  //   1: 'Electronics',
  //   2: 'Clothes',
  //   3: 'Furniture',
  //   4: 'Books',
  //   5: 'Other',
  // }

  // for (var i in categories){
  //   var category = await db.Categories.findOne(i)
  //   if(!category){
  //     await db.Categories.create({category_name: categories[i]});
  //   }
  // }
  
  // sync all models with database
  await sequelize.sync();
}
