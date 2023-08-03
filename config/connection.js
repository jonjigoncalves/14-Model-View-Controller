require('dotenv').config();

const { Sequelize } = require('sequelize');

// for herkou production
const isProduction = process.env.JAWSDB_URL;
let sequelize;

if(isProduction){
 sequelize = new Sequelize (process.env.JAWSDB_URL, {
    dialect: 'mysql'
 });
} else{

 sequelize = new Sequelize('blog_db', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});
}

module.exports = sequelize; 