'use strict';
module.exports = (sequelize, DataTypes) => {
  const FirstName = sequelize.define('FirstName', {
    firstName: DataTypes.STRING,
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    }
  }, {});
  FirstName.associate = function(models) {
    // associations can be defined here
  };
  FirstName.beta = true
  return FirstName;
};