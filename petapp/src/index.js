import React from 'react';
import {ReactDOM, render} from 'react-dom';
import axios from 'axios';

import { BrowserRouter as Router, Redirect, Route, Link} from "react-router-dom";
import $ from 'jquery';

import 'bootstrap/dist/css/bootstrap.css';
import './css/style.css';
import './sass/style.sass';

import Storage from './components/animalStorage.js';
import Map from './components/Map';
import Places from './components/Places';


var APIURL = "http://127.0.0.1:8000/api/";
const google=window.google;
// let lat, lng;
let fakeCount = 0;
let realCount = 1;
let checkingName = 0;
let checkingNameArray = [];
let foundUsersPet = [];
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
						<Link to="/map" className="navbar-brand">Map </Link>
						<Link to="/place" className="navbar-brand">Places </Link>
						<a href="/signup" className="navbar-brand">Sign-Up</a>
						{loginOrLogout}
	                </div>
	            </nav>
	              <Route exact path={"/"} component={PetRegistration} />
		          <Route path={"/storage"}  render={() => <Storage ids={checkingName} />} />
		          <Route path={"/map"}  render={() => <Map  containerElement={<div style={{ height: `0` }} />}
  															mapElement={<div style={{ height: `0%` }} />}/> }/>
		          <Route path={"/place"}  render={() => <Places />} />

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
      	"last_seen_place" 	: this.state.Last_seen_place,
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

    google.maps.event.addDomListener(window, 'load', intilize);
    function intilize() {
        var autocomplete = new google.maps.places.Autocomplete(document.getElementById("txtautocomplete"));
        google.maps.event.addListener(autocomplete, 'place_changed', function () {

        var place = autocomplete.getPlace();
        var location = "Address: " + place.formatted_address + "<br/>";
        location += "Latitude: " + place.geometry.location.lat() + "<br/>";
        location += "Longitude: " + place.geometry.location.lng();
        // document.getElementById('lblresult').innerHTML = location
        });
    };

	}

	SearchByName(e) {
		e.preventDefault();
		axios.get(APIURL+'animals').then(res => {
			let petPetName, petPetId, petName, prize, desc, lastSeen, elementObj;
			this.state.countTrue = 0;
			this.state.petIds = 0;
			res.data.map(pet => {
				petPetName = pet.pet_name.toUpperCase();
				if (this.state.usersPetName == petPetName) {
				elementObj = {
					"name" 				: pet.pet_name,
					"prize"				: pet.prize_for_help,
					"description"		: pet.description,
					"lastseenplace"		: pet.last_seen_place
				}
				checkingNameArray.push(pet.id);
				foundUsersPet.push(elementObj)
					petPetId 	= pet.id;
					this.setState({
						countTrue 	: this.state.countTrue + 1,
						petIds 		: petPetId,

					})
				}
		})
		for (let i in foundUsersPet) {
		  console.log(JSON.stringify(foundUsersPet[i]));
		  $(".showFoundInformation").append(`
		  	    <div class='lightboxTXT'>
                <div class="lightboxNAME">Name   : ${foundUsersPet[i].name}</div>
                <div class="lightboxPrize">Prize               : ${foundUsersPet[i].prize}</div>
                 <div class="lightboxDesc">Description         : ${foundUsersPet[i].description}</div>
                  <div class="lightboxDesc">Last seen place     : ${foundUsersPet[i].lastseenplace}</div>
                
                
                
            </div>
		  	`);	
		}		

		checkingName += this.state.petIds;
		}).then(() => {
			$(".modalSelfMadeWindow > span").click( () => {
				$('.modalSelfMadeWindow').css("display", "none");
				$( ".reg_btn" ).prop( "disabled", false );
				$(".showFoundInformation > p").remove();
				foundUsersPet.length = 0;	
			})
			$('.modalSelfMadeWindow').css("display", "block");
			$( ".reg_btn" ).prop( "disabled", true );


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
			alert("Created")
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
		               <input type="text" ref="Last_seen_place" id="txtautocomplete" className="def-input last-input" onChange={this.handleChange} />
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

			<div className="modalSelfMadeWindow">
				<h1>Your request completed</h1>
				<span>X</span>
				<div className="showFoundInformation">
					
				</div>
			</div>
			<div className="registration_container">
				<div className="container">
					<div className="wrapper">	
							<div className="intro_image">
								<img src={require("./dog")} alt="lost-dog"/>
							    <div className="reg_form" id="block_post">
							      <fieldset className="pet__name__block">
							        <legend className="pet__name">Pet Name</legend>
							        <p className="pet__name__p sameFontSize"><span className="short__description">{this.state.PetName}</span> <i className="fas fa-check-circle"></i></p>
							      </fieldset> 
							      <fieldset className="pet__name__block__description">
							        <legend className="pet__description">Description</legend>
							        <p className="pet__description__p sameFontSize"><span className="short__description">{this.state.Description}</span> <i className="fas fa-exclamation-circle"></i></p>
							      </fieldset> 
							      <fieldset className="pet__name__block__last__seen">
							        <legend className="pet__last__seen">Last seen place</legend>
							        <p className="pet__last__seen__p sameFontSize"><span className="short__description">{this.state.Last_seen_place}</span> <i className="fas fa-map-marker"></i></p>
							      </fieldset>    
							      <h1 className="created__class">CREATED</h1>    
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
								<h1>Problem we solve:</h1>
								<h3>Were you ever affected by any kind of loneliness when all friends had
								things to do and left you by yourself? There are pets to cheer you up!
								
								You could have possibly lost your pet. Do you remember the last place you saw it?
								If you do - we are here to help you. And even if not - don`t worry, people will 
								give effort to finding your pet according to your proposed reward.
								</h3>

								<h1 class="asda">Are you a seller?</h1>							
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


