'use strict';

// Create a Sequelize model

module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Users', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};