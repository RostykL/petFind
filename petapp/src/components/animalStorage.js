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
          <div className="col-2">
            <div className="pet-block"><span class="pet-name-class">Pet Name:</span> 
              <span className="rel-pet-name">{this.props.storage.pet_name}</span>
            </div>
            <hr />
            <div className="desc-block"><span class="description">Description:</span>
              <span className="rel-pet-desc">{this.props.storage.description}</span>
              <span className="rel-pet-desc storage-id">{this.props.storage.id}</span>
            </div>
            <div className="desc-block"><span class="description">last seen:</span>
              <span className="rel-pet-desc">{this.props.storage.last_seen_place}</span>
            </div>

          </div>
          </div>
        </div>
      )
    }
}