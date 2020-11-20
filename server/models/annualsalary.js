'use strict';
module.exports = (sequelize, DataTypes) => {
  const AnnualSalary = sequelize.define('AnnualSalary', {
    salary: {
      type: DataTypes.INTEGER,
      allowNull : false
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
  AnnualSalary.associate = function(models) {
    // associations can be defined here
    AnnualSalary.belongsTo(models.Year)
  };

  AnnualSalary.beta = true

  return AnnualSalary;
};