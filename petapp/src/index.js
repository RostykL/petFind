import React from 'react';
import {ReactDOM, render} from 'react-dom';
import axios from 'axios';

import { BrowserRouter as Router, Redirect, Route, Link} from "react-router-dom";
import $ from 'jquery';

import 'bootstrap/dist/css/bootstrap.css';
import './css/style.css';
import './sass/style.sass';

import Storage from './components/animalStorage.js';


var APIURL = "http://127.0.0.1:8000/api/";
let checkingName = 0;
let boolButString = $('#DJANGO_USER').text()
var StringToBool = (boolButString === 'true');
class Header extends React.Component{
	render() {
		let loginOrLogout = StringToBool ? (
			<a href="/logout" className="navbar-brand">Log-Out</a>
		) : (
			<a href="/login" className="navbar-brand">Login</a>
		) 
		return (
				<Router>
					<div>
	            <nav className="navbar navbar-inverse bg-inverse">
	                <div className="container">
						<Link to="/" className="navbar-brand">PetFinder</Link>
						<Link to="/storage" className="navbar-brand">Storage </Link>
						<a href="/signup" className="navbar-brand">Sign-Up</a>
						{loginOrLogout}
	                </div>
	            </nav>
	              <Route exact path={"/"} component={PetRegistration} />
		          <Route path={"/storage"}  render={() => <Storage ids={checkingName} />} />
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
		this.handleLengthANDGetPetNameValue	 = this.handleLengthANDGetPetNameValue.bind(this)
		this.state = {
    	PetName     	: "",
    	description 	: "",
    	last_seen_place : "",
    	prize_for_help	: 0,
    	DJANGO_USER		: false
    	}
    	// console.log(StringToBool)
    	this.state.DJANGO_USER = StringToBool;
	    this.handleChange = this.handleChange.bind(this);
	    this.handleSubmit = this.handleSubmit.bind(this);
	    this.SearchByName = this.SearchByName.bind(this);
		}

	// Article Creation method
	handleChange(e){
		let currentUser = $('.currentUser').text()
		let currentUserName = $('.currentUserName').text()
  		e.preventDefault()
	    this.setState({
      	PetName     	: this.refs.PetName.value,
      	Description 	: this.refs.Description.value,
      	Last_seen_place : this.refs.Last_seen_place.value,
    	Prize_for_help	: this.refs.Prize_for_help.value,
      });

      this.state.artc = {
      	"postedBy"	  		: currentUserName,
      	"author"      		: Number(currentUser),
        "description" 		: this.state.Description,
        "pet_name"    		: this.state.PetName,
      	"last_seen_place" : this.state.Last_seen_place,
    	"prize_for_help"	: Number(this.state.Prize_for_help),
	   }
 	 }

	handleSubmit(e){
	    e.preventDefault();
	  	axios.post(APIURL+'animals/simplified/',  this.state.artc)
	  	.then(  data => alert("CREATED"))
	  	.catch(error => alert("Something gone wrong!", error.response));
	    this.refs.Last_seen_place.value = "";
    	this.refs.Prize_for_help.value 	= "";
	    this.refs.Description.value 	= "";
	  	this.refs.PetName.value 		= "";
	  }
  	// Article Creation END

	handleLengthANDGetPetNameValue(e) {
		let val = e.target.value;
	 	let lenInputs = e.target.value.length
		this.state.usersPetName = e.target.value.toUpperCase()
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
		axios.get(APIURL+'animals').then(res => {
			let petPetName, petPetId;
			this.state.countTrue = 0;
			this.state.petIds = 0;
			res.data.map(pet => {
				petPetName = pet.pet_name.toUpperCase();
				if (this.state.usersPetName == petPetName) {
					petPetId = pet.id;
					this.setState({
						countTrue : this.state.countTrue + 1,
						petIds : petPetId
					})
				}
		})
		alert(`We found ${this.state.countTrue} pets name, check out the STORAGE and your number is ${this.state.petIds}`);
		checkingName += this.state.petIds;
		})
	}
	render() {
		let button = this.state.inputValueLenght >= 1 ? (
		      <button className="reg_btn" onClick={this.SearchByName}>Find</button>
	    ) : (
	      <input className="reg_btn" type="submit" value="Register"  onClick={this.showForm}/>
	    );
	    let check_if_user_is_login_in = this.state.DJANGO_USER ? (
				<form onSubmit={this.handleSubmit} className="add_a_new_one">								
		           <label> <span className="pet-bor">Pet name:</span>
		               <input className="reg_input" type="text" ref="PetName" onChange={this.handleChange} />
	             	</label>
		            <br/>
		            <label> Description:
		               <input type="text" ref="Description" className="def-input first-input" onChange={this.handleChange} />
		            </label>
		            <br/>
		            <label> Prize for help:
		               <input type="number" ref="Prize_for_help" className="def-input second-input" onChange={this.handleChange} />
		            </label>
		            <br/>
		            <label> Last seen place:
		               <input type="text" ref="Last_seen_place" className="def-input last-input" onChange={this.handleChange} />
		            </label>
		            <hr/>
		            <input type="submit" value="save" className="submit-input" id="subin" onClick={this.redirectToStorage}/>
		        </form>	    	
	    ) : (
	    	<div className="add_a_new_one">
	    			<h1>Login to continue</h1>
	    			<a href="/login" className="navbar-brand">Login</a>
	    	</div>		
	    )
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
									  name="findPetByName"
									  placeholder="Find by the name"
									  onChange={this.handleLengthANDGetPetNameValue} />
									{button}
								</form>
								{check_if_user_is_login_in}

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
