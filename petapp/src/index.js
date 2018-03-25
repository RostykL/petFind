import React from 'react';
import {ReactDOM, render} from 'react-dom';
import axios from 'axios';

import { BrowserRouter as Router, Redirect, Route, Link} from "react-router-dom";
import $ from 'jquery';

import 'bootstrap/dist/css/bootstrap.css';
import './css/style.css';

import Storage from './components/animalStorage.js';


var APIURL = "http://127.0.0.1:8000/api/";


class Header extends React.Component{
	render() {
		return (
				<Router>
					<div>
	            <nav className="navbar navbar-inverse bg-inverse">
	                <div className="container">
										<Link to="/" className="navbar-brand">PetFinder</Link>
						      	<Link to="/storage" className="navbar-brand">Storage </Link>
	                </div>
	            </nav>
	              	<Route exact path={"/"} component={PetRegistration} />
		              <Route path={"/storage"} component={Storage} />
	       	</div>
        </Router>
		)
	}
}
// First Block
class PetRegistration extends React.Component{
	constructor(props) {
		super(props)
		this.state = {inputValueLenght: 0}
		this.handleLength = this.handleLength.bind(this)
		this.state = {
    	PetName     : "",
    	Description : "",
    	Phone       : 0
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this); 
	}
	// Article Creation method
	handleChange(e){
  		e.preventDefault()
  		let StrToIntPhone = Number(this.refs.Phone.value);
	    this.setState({
      	PetName     : this.refs.PetName.value,
      	Description : this.refs.Description.value,
      	Phone       : StrToIntPhone,
      });

      this.state.artc = {
        "description" : this.state.Description,
        "petName"     : this.state.PetName,
        "phone"       : this.state.Phone
	    }
  }

  handleSubmit(e){
    e.preventDefault();
  	axios.post(APIURL+'animals',  this.state.artc);
  	alert("CREATED")
  }

  // Article Creation END

	handleLength(e) {
	 	let lenInputs = e.target.value.length
		this.setState({
			inputValueLenght: lenInputs 
		});
	}	

	showForm(e) {
		e.preventDefault()
		$('.add_a_new_one').toggleClass('show');
	}

	SearchByName(e) {
		e.preventDefault();
	}

	render() {
			let button = this.state.inputValueLenght >= 1 ? (
	      <input className="reg_btn" type="submit" value="Find" onClick={this.SearchByName}/>
	    ) : (
	      <input className="reg_btn" type="submit" value="Register" onClick={this.showForm}/>
	    );
		return (
			<div>
			<div className="registration_container">
				<div className="container">
					<div className="wrapper">
							<div className="intro_image">
								<img src={require("./dog")} alt="lost-dog"/>
							</div>
							<div className="register_animal">
								<h1>Find & Register </h1>
								<form>
								  <input className="reg_input" 
								  type="text" 
								  name="name" 
								  placeholder="Find by the name"
								  onChange={this.handleLength} />
								  {button}
								</form>

								<form onSubmit={this.handleSubmit} className="add_a_new_one">
			              <label> Pet name: 
			                <input className="reg_input" type="text" ref="PetName" onChange={this.handleChange} />
			              </label>
			              <br/>	
			              <label> Phone: 
			                <input className="reg_input" type="number" ref="Phone" onChange={this.handleChange} />
			              </label>		
			              <label> Description: 
			                <input type="text" ref="Description" onChange={this.handleChange} />
			              </label>
			               <hr/>
			            <input type="submit" value="save" onClick={this.redirectToStorage}/>
			          </form>

							</div>
					</div>
				</div>	
			</div>

			<div className="info_find">
				<div className="container">
					<div className="wrapper">
							<div className="information">
								<h1>information</h1>
							</div>
							<div className="intro_image_finding">
								<h1>Image</h1>
							</div>
					</div>
				</div>		
			</div>

			</div>
		)
	}
}

render(
	<Header />,
	document.getElementById('root'));
