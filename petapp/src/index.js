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

let fakeCount = 0;
let realCount = 1;

let checkingName = 0;
let checkingNameArray = [];
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
    	DJANGO_USER		: false,
    	noErrorHandle	: false,
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
	  	.then(data => {
	  		$(".created__class").show()
	  		this.setState({
	  			noErrorHandle: true,
	  		})
	  	})
	  	.catch(error => {
	  		$(".created__class").show().text("ERROR").css("color", "red")
	  		this.setState({
	  			noErrorHandle: false,
	  		})
	  		setTimeout( () => $(".created__class").hide())
	  	});
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
		$('#block_post').show();
		// 1
		fakeCount++
		if (fakeCount > realCount) {
  	  	  $("#block_post").css("transform" , "scale(0.08)");
  	      $("#block_post").css("transition" , "1s");	
  	  	  $("#block_post").css("margin" , "365px 0 0 17px");
	  	  $("#block_post").css("top" , "0");
  	  	  $("#block_post").css("left" , "0");  	  	  
  	      realCount += 2;
  	  	} else {
  	  	  $("#block_post").css("top" , "-234px");
  	  	  $("#block_post").css("left" , "73px");
	      $("#block_post").css("transform" , "scale(1)");
  	      $("#block_post").css("transition" , "1s")
  	  	}
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
				checkingNameArray.push(pet.id);
					petPetId = pet.id;
					this.setState({
						countTrue : this.state.countTrue + 1,
						petIds : petPetId
					})
				}
		})
		alert(`We found ${this.state.countTrue} pets name, check out the STORAGE and your number is ${this.state.petIds}`);
		console.log(checkingNameArray);
		checkingName += this.state.petIds;
		})
	}


	showAnimation(e) {
		if (this.state.noErrorHandle) {
			$("#block_post").css("animation" ,"animToHeader 1.3s ease");
			setTimeout(() => {
				$("#block_post").css("animation" ,"");
				$(".created__class").hide();
				$(".short__description").text(" ");
			}, 2500)
		} else {
			alert("Oops WARNING, something gone wrong!!!")
		}
	}

	render() {
		let button = this.state.inputValueLenght >= 1 ? (
		    <button className="reg_btn" onClick={this.SearchByName}>Find</button>
	    ) : (
	     	<input className="reg_btn" type="submit" value="Register"  onClick={this.showForm} id="increaseIt"/>
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
		            <input type="submit" value="save" className="submit-input" id="subin" onClick={this.showAnimation.bind(this)}/>
		        </form>	    	
	    ) : (
	    	<div className="add_a_new_one">
	    			<h1><a href="/login" className="navbar-brand"><h1>Login </h1> </a> to continue</h1>
	    	</div>		
	    )
		return (
			<div>
			<div className="registration_container">
				<div className="container">
					<div className="wrapper">	
							<div className="intro_image">
								<img src={require("./dog")} alt="lost-dog"/>
							    <div class="reg_form" id="block_post">
							      <fieldset class="pet__name__block">
							        <legend class="pet__name">Pet Name</legend>
							        <p class="pet__name__p sameFontSize"><span class="short__description">{this.state.PetName}</span> <i class="fas fa-check-circle"></i></p>
							      </fieldset> 
							      <fieldset class="pet__name__block__description">
							        <legend class="pet__description">Description</legend>
							        <p class="pet__description__p sameFontSize"><span class="short__description">{this.state.Description}</span> <i class="fas fa-exclamation-circle"></i></p>
							      </fieldset> 
							      <fieldset class="pet__name__block__last__seen">
							        <legend class="pet__last__seen">Last seen place</legend>
							        <p class="pet__last__seen__p sameFontSize"><span class="short__description">{this.state.Last_seen_place}</span> <i class="fas fa-map-marker"></i></p>
							      </fieldset>    
							      <h1 class="created__class">CREATED</h1>    
							    </div>
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


