'use strict';
module.exports = (sequelize, DataTypes) => {
  const MiddleName = sequelize.define('MiddleName', {
    middleName: {
      type: DataTypes.STRING,
      allowNull : true
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    }
  }, {});
  MiddleName.associate = function(models) {
    // associations can be defined here
  };
  MiddleName.beta = true
  return MiddleName;
};