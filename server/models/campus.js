'use strict';
module.exports = (sequelize, DataTypes) => {
  const Campus = sequelize.define('Campus', {
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
  Campus.associate = function(models) {
        // associations can be defined here
        Campus.belongsToMany(models.Department, { through: 'CampusDepartment' });
    // associations can be defined here
  };
  Campus.beta = true
  return Campus;
};