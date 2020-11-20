'use strict';
module.exports = (sequelize, DataTypes) => {
  const CampusDepartment = sequelize.define('CampusDepartment', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
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
  CampusDepartment.associate = function(models) {
    // associations can be defined here
  };
  CampusDepartment.beta = true
  
  return CampusDepartment;
};                                                        