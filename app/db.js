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
  
  var r = {
    1: 'modérateur',
    2: 'admin',
    3: 'super_admin',
    4: 'test1',
    5: 'test2',
    6: 'user',
  }

  var roleService = require('./service/role.service');
  var categoryService = require('./service/category.service');
  for (var i in r){
    var role = await roleService.findOne(i);
    if(!role){
      await db.Roles.create({role_type: r[i]});
    }
  }

  var c = {
    1: 'Electronics',
    2: 'Clothes',
    3: 'Furniture',
    4: 'Books',
    5: 'Other',
  }

  for (var i in c){
    var category = await categoryService.findOne(i)
    if(!category){
      await db.Categories.create({category_name: c[i]});
    }
  }
  
  // sync all models with database
  await sequelize.sync();
}
