const Sequelize = require('sequelize');

const sequelize = new Sequelize('expense', 'root', 'Sharpenarian1998',{
    dialect: 'mysql',
    host: 'localhost'
} )
module.exports = sequelize;