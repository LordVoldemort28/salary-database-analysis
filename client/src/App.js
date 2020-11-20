import React, { useState, useEffect, Component }from 'react';
import './App.css';
import * as d3 from 'd3'
import * as d3tip from 'd3-tip'
import BarChart from './barChart'
import ScatterPlot from './scatterPlot'
import Pie from './pie'
import Form from './form'
import { Container, Row, Col } from 'reactstrap';
class App extends Component {
state = {
    data: null,
    value: null,
    genderData: null,
    averageSalaryData: null,
    departmentSalary: null,
  };

  async componentDidMount() {
    
     const genderQuery = 'SELECT Genders.gender, Count(*) as count  FROM Employees  JOIN Genders ON Employees.GenderId = Genders.id GROUP BY Genders.gender;'
     const response = await fetch(`query?q=${genderQuery}`)
     .then((resolve) => resolve.json())
     .then((data) => {
       d3.select("#genderData").text(data)
       return (
         this.setState({ genderData : data})
         )
     })

     const averagesalaryQuery = `SELECT Genders.gender, Count(*) as NumOfEmployees, sum(AnnualSalaries.salary) salary  from Employees JOIN AnnualSalaries ON Employees.AnnualSalaryId = AnnualSalaries.id JOIN Genders ON Employees.GenderId = Genders.id GROUP BY Employees.genderId;`

     const response1 = await fetch(`query?q=${averagesalaryQuery}`)
     .then((resolve) => resolve.json())
     .then((data) => {
       return (
         this.setState({ averageSalaryData : data})
         )
     })

     const DepartmentQuery = `SELECT Departments.name as name, Departments.id as ID, AnnualSalaries.salary  FROM Employees JOIN AnnualSalaries ON AnnualSalaries.id =  Employees.AnnualSalaryId JOIN CampusDepartments ON CampusDepartments.id =  Employees.CampusDepartmentId JOIN Departments ON Departments.id = CampusDepartments.DepartmentId;`

     const response2 = await fetch(`query?q=${DepartmentQuery}`)
     .then((resolve) => resolve.json())
     .then((data) => {
       return (
         this.setState({ departmentSalary : data})
         )
     })
  }

  tempData = [ {state: "Alabama", population: 4822023, gdp: 157272},
   {state: "Alaska", population: 731449, gdp: 44732},
   {state: "Arizona", population: 6553255, gdp: 230641},
   {state: "Arkansas", population: 2949131, gdp: 93892},
   {state: "California", population: 38041430, gdp: 1751002},
   {state: "Colorado", population: 5187582, gdp: 239884},
   {state: "Connecticut", population: 3590347, gdp: 197202},
   {state: "Delaware", population: 917092, gdp: 56110},
   {state: "District_of_Columbia", population: 632323, gdp: 92106},
   {state: "Florida", population: 19317568, gdp: 672287},
   {state: "Georgia", population: 9919945, gdp: 374000},
   {state: "Hawaii", population: 1392313, gdp: 61877},
   {state: "Idaho", population: 1595728, gdp: 50976},
   {state: "Illinois", population: 12875255, gdp: 594201},
   {state: "Indiana", population: 6537334, gdp: 255380},
   {state: "Iowa", population: 3074186, gdp: 129799},
   {state: "Kansas", population: 2885905, gdp: 118523},
   {state: "Kentucky", population: 4380415, gdp: 146829} ]

   tempData1 = [ {state: "Alabama", population: 4822023, gdp: 157272},
   {state: "Alaska", population: 731449, gdp: 44732},
   {state: "Arizona", population: 6553255, gdp: 230641},
   {state: "Arkansas", population: 2949131, gdp: 93892},
   {state: "California", population: 38041430, gdp: 1751002}, ]

    handleSubmit = async (event, value) => {
    event.preventDefault()
    const response = await fetch(`query?q=${this.state.value}`).
    then(data => data.json()).
    then((data)=>{this.setState({data})});
  }

  handleChange = (event) => {
    this.setState({value: event.target.value})
  }

  getGenderRatio = async () => {
    const genderQuery = 'SELECT Genders.gender, Count(*) as count  FROM Employees  JOIN Genders ON Employees.GenderId = Genders.id GROUP BY Genders.gender;'
    const response = await fetch(`query?q=${genderQuery}`)
    .then((resolve) => resolve.json())
    .then((data) => {
      console.log(data)
    })
  }

  render() {
    console.log(this.state.averageSalaryData)
    return (
    <Container className='wikiPage'>
      <Row style={{ margin: '50px 0px' }}>
      <Col>
        <Form handleSubmit={this.handleSubmit} handleChange={this.handleChange}/>
      <h1>Gender Ratio</h1>
      <br/>
      <br/>
      <div className="button1">
        {this.state.genderData === null ? <br />: 
        <div id="genderData"> 
          <Pie
            data={this.state.genderData}
            width={400}
            height={400}
            innerRadius={80}
            outerRadius={200}
          />
          <br />
          <p>
            <h4>As we can see in the pie chart: </h4>
            <ol>
              <li>Women consists of 46.64% of the Employee dataset</li>
              <li>Men consists of 43.45% of the Employee dataset</li>  
              <li>Unknown genders consists of 5.21% of the Employee dataset</li>  
              <li>androgynous genders consists of 2.67% of the Employee dataset</li>  
            </ol> 
            <br />
            Therefore, we have enough data to do our analysis as we have almost equal ratio of males and females. 
          </p> 
        </div>}
      </div>
      {this.state.averageSalaryData !== null ? 
      <div className="container">
        <br /><br /> <br />
        <h1>Average Annual Salary</h1>
        <BarChart tempData={this.state.averageSalaryData} top={0}/> 
        <br /> <br />
        <p>
            <h4>As we can see in the bar Graph: </h4>
            <ol>
              <li>Female Employee's Average Salary is $56,948</li>
              <li>Male Employee's Average Salary is $69,871</li>  
              <li>Employees with unknown gender have Average Salary is $73,485</li>  
              <li>Employees with androgynous gender have Average Salary is $60,648</li>  
            </ol> 
            <br />
            Therefore, it can be inferred that on average, males earn more money than females at University of Nebraska-Lincoln. 
          </p> 
      </div>
    : <br />}
      

      {this.state.departmentSalary !== null ? 
      <div className="container">
        <br /><br /> <br />
        <h1>Salary Distribution across departments</h1>
        <ScatterPlot tempData={this.state.departmentSalary} top={0}/>  
        <br /> <br />
      </div>
    : <br />}
      </Col>
     </Row>
    </Container>
    );
  }
}

export default App;