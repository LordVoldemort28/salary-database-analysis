import React, {Component} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

class Form extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        value: null,
      }
    }
  
    render() {
      //{const this1 = this}
    //   <div class="form-group">
    //   <h1><label for="Enter the query here:">Enter the query here:</label></h1><br>
    //   <input type="text" class="form-control"  name="q" aria-describedby="emailHelp" placeholder="Enter query">
    //   <small id="emailHelp" class="form-text text-muted">Click on the submit button to view the results od query.</small><br>
    //   <button type="submit" class="btn btn-primary">Submit</button>
    // </div>

      return (
          <div class="container">
              <br></br>
        <form onSubmit={this.props.handleSubmit}>
        <div class="form-group">
          <h1><label htmlFor="username">Enter query</label></h1>
          <input 
            class="form-control"
            id="input" 
            placeholder="Enter the query..." 
            name="input"
            type="text" 
            onChange={this.props.handleChange}
            />
            <small id="emailHelp" class="form-text text-muted">Click on the submit button to view the results of query.</small>
          <button class="btn btn-primary button">Execute Query!</button>
          </div>
        </form>
        </div>
      );
    }
  }

  export default Form;