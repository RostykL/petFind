import React from 'react';
import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.css';
        
var APIURL = "http://127.0.0.1:8000/api/";

export default class Storage extends React.Component {
    constructor(props){
        super(props)
        this.state = {};
        this.state.storage = [];
    }
    componentDidMount(){
      var self = this;
      axios.get(APIURL + "animals").then(response => {
        self.setState({
          storage: response.data,
        });
      });
    }
    render(){
      return <EveryPet storages={this.state.storage}/>
    }
}

class EveryPet extends React.Component {
    render(){
        return (
        	<div>
                {
                  this.props.storages.map((storage, i) => {
                    return <StorageShow storage={storage} key={i}/>
                  })

                }            
            </div>  
        )
    }
}

class StorageShow extends React.Component {
    render(){
      return (
        <div>
          <div className="container"> 
            <h1>Storage:</h1>
            
            <div className="col-8">
              <div>User:
                {this.props.storage.petName}
              </div>
              <div>Description:
                {this.props.storage.description}
              </div>
            </div>
          </div>
        
        </div>
      )
    }
}