'use strict';
module.exports = (sequelize, DataTypes) => {
  const Employee = sequelize.define('Employee', {
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
  Employee.associate = function(models) {
    // associations can be defined here
    Employee.belongsTo(models.FirstName)
    Employee.belongsTo(models.LastName)
    Employee.belongsTo(models.MiddleName)
    Employee.belongsTo(models.Position)
    Employee.belongsTo(models.CampusDepartment)
    Employee.belongsTo(models.Gender)
    Employee.belongsTo(models.AnnualSalary)

  };
  Employee.beta = true
  return Employee;
};