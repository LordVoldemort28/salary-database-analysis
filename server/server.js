
const express = require('express');
const app = express();
const port = process.env.PORT || 4000;
const db = require('./db')
const fs = require('fs')
const csv = require('csv-parser');
const models = require('./models')
const {QueryTypes} = require('sequelize')
const bodyParser = require('body-parser')
// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));

const dataMap = []
const firstnameSet = new Set()
const lastnameSet = new Set()
const middelnameSet = new Set()
const genderSet = new Set()
const positionSet = new Set()
const departmentSet = new Set()
const campusSet = new Set()
const annualSalarySet = new Set()

const campusMap = {}
const firstnameMap = {}
const lastnameMap = {}
const middelnameMap = {}
const genderMap = {}
const positionMap = {}
const departmentMap = {}
const annualSalaryMap = {}
const campusDepartmentMap = {}

const yearMap = {
  '2019' : 1,
  '2018' : 2,
  '2017' : 3,
}

const salaryYear = '2019'

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

db.authenticate()
  .then(() => { 
    console.log('Connected to the database successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  })

function createTable(attributeSet, attributeName, attributeMap, tableName) {
    attributeSet.forEach(async (each) => {
      let obj = {}
      obj[attributeName] = each
      const create = await models[tableName].create(obj, {logging:false})
      attributeMap[each] = create.id
    })
    console.log(`${tableName} have ${attributeSet.size}.....`)
}

function createTableSalary(attributeSet, attributeName, attributeMap, tableName) {
  attributeSet.forEach(async (each) => {
    let obj = {}
    obj[attributeName] = each
    obj['YearId'] = yearMap[salaryYear]
    const create = await models[tableName].create(obj, {logging:false})
    attributeMap[each] = create.id
  })
  console.log(`${tableName} have ${attributeSet.size}.....`)
}

function createTableDepartmentCampus() {
  dataMap.map( async(row) => {
    const campusDepartment = await models.CampusDepartment.findOrCreate({
      where:{
        DepartmentId : departmentMap[row.Department],
        CampusId : campusMap[row.Campus]
      },
      logging: false
    })
    campusDepartmentMap[[row.Department, row.Campus]] = campusDepartment[0].dataValues.id
  })
}

function createEmployee(){
  dataMap.map( async(row) => {
    const employee = await models.Employee.create({
      PositionId : positionMap[row.Position],
      FirstNameId : firstnameMap[row.Firstname],
      LastNameId : lastnameMap[row.Lastname],
      MiddleNameId : middelnameMap[row.Middlename],
      CampusDepartmentId : campusDepartmentMap[[row.Department, row.Campus]],
      GenderId : genderMap[row.Gender],
      AnnualSalaryId : annualSalaryMap[row['Annual Salary']],
    }, {logging:false})
  })
}

  // create a GET route
app.post('/load', async (req, res) => {

    await fs.createReadStream('../csv/2019-2020-Salaries.csv')
    .pipe(csv())
    .on('data', (row) =>{
      dataMap.push(row)
      firstnameSet.add(row.Firstname)
      lastnameSet.add(row.Lastname)
      middelnameSet.add(row.Middlename)
      genderSet.add(row.Gender)
      positionSet.add(row.Position)
      campusSet.add(row.Campus)
      departmentSet.add(row.Department)
      annualSalarySet.add(row['Annual Salary'])
    })
    .on('end', async () => {
      await models.Year.create({
        year: salaryYear
      }, {logging:false})
      createTable(firstnameSet, 'firstName', firstnameMap, 'FirstName')
      createTable(lastnameSet, 'lastName', lastnameMap, 'LastName')
      createTable(middelnameSet, 'middleName', middelnameMap, 'MiddleName')
      createTable(genderSet, 'gender', genderMap, 'Gender')
      createTable(positionSet, 'name',positionMap, 'Position')
      createTable(campusSet, 'name', campusMap, 'Campus')
      createTable(departmentSet, 'name', departmentMap, 'Department')
      createTableSalary(annualSalarySet, 'salary', annualSalaryMap, 'AnnualSalary')
      setTimeout(createTableDepartmentCampus, 10000)
      setTimeout(createEmployee, 20000)
    });
    
});

app.get('/query', (req, res) => {
  const query = req.query.q;
  console.log(query)
  db.query(query, { type: QueryTypes.SELECT, logging: false }).then((data) => {
    console.log(data)
    res.send(data);
  })
});


// create a GET route
app.get('/', (req, res) => {
  res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
});