'use strict';
module.exports = (sequelize, DataTypes) => {
  const Year = sequelize.define('Year', {
    year: DataTypes.STRING,
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    }
  }, {});
  Year.associate = function(models) {
    // associations can be defined here
  };
  Year.beta = true
  return Year;
};