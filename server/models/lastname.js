'use strict';
module.exports = (sequelize, DataTypes) => {
  const LastName = sequelize.define('LastName', {
    lastName: DataTypes.STRING,
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    }
  }, {});
  LastName.associate = function(models) {
    // associations can be defined here
  };
  LastName.beta = true
  return LastName;
};