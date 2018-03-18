import React from 'react';
import {ReactDOM, render} from 'react-dom';

import { BrowserRouter as Router, Route, Link} from "react-router-dom";
import $ from 'jquery';

import 'bootstrap/dist/css/bootstrap.css';
import './css/style.css';

import Storage from './components/animalStorage.js';

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
              <div className="container">
	              <Route path="/storage" component={Storage}/>
              </div>
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
	}

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
	render() {
			let button = this.state.inputValueLenght >= 1 ? (
	      <input className="reg_btn" type="submit" value="Find"/>
	    ) : (
	      <input className="reg_btn" type="submit" value="Register" onClick={this.showForm}/>
	    );
		return (

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

								<form className="add_a_new_one">
									<label>
									NAME:
									<input className="reg_input" placeholder="Ralf" type="name" text="name"/>
									</label>
									<label>
									TELEPHONE:
									<input className="reg_input" placeholder="093..." type="tel" text="tel"/>
									</label>
									<label>
									EMAIL:
									<input className="reg_input" placeholder="example@gmail.com" type="email" text="email"/>
									</label><br/>
									<input className="reg_btn" type="submit"/>
								</form>
							
							</div>
					</div>
				</div>		
			</div>
		)
	}
}

class HowItWorks extends React.Component {
	render() {
		return (
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
		)
	}
}

class App extends React.Component{
	render() {
		return (
			<div>
				<Header/>
				<PetRegistration/>
			</div>
		)
	}	
}


render(
	<App />, 
	document.getElementById('root'));
