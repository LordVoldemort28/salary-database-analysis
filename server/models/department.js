'use strict';
module.exports = (sequelize, DataTypes) => {
  const Department = sequelize.define('Department', {
    name: DataTypes.STRING,
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    }
  }, {});
  Department.associate = function(models) {
    // associations can be defined here
    Department.belongsToMany(models.Campus, { through: 'CampusDepartment' });
  };
  Department.beta = true

  return Department;
};