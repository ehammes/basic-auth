const { Sequelize, DataTypes } = require('sequelize');
const userSchema = require('./users-model');
require('dotenv').config();

// db connection
const DATABASE_URL = process.env.NODE_ENV === 'test' 
  ? 'sqlite::memory'
  : process.env.DATABASE_URL || 'postgres://localhost:5432/401d47-api-auth';

// const sequelize = new Sequelize(DATABASE_URL);
// Connection to Database
const sequelize = new Sequelize(DATABASE_URL, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

// Create User Model
const UserSchema = userSchema(sequelize, DataTypes);

module.exports = {
  sequelize, 
  UserSchema,
};