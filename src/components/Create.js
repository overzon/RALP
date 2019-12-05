import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import firebase from '../Firebase';
import { Link } from 'react-router-dom';

class Create extends Component {

  constructor() {
    super();
    this.ref = firebase.firestore().collection('travels');
    this.state = {
      travelname : "", 
      description : '', 
      address : '' ,
      image : '', 
      image360 : '', 
      lat : '', 
      lng : '', 
      star : '', 
      travelclose : '', 
      travelopen : ''
    };
  }
  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { travelname, description, address ,image, image360, lat, lng, star, travelclose, travelopen } = this.state;

    this.ref.add({
        travelname, description, address ,image, image360, lat, lng, star, travelclose, travelopen
    }).then((docRef) => {
        this.state = {
            travelname : "", 
            description : '', 
            address : '' ,
            image : '', 
            image360 : '', 
            lat : '', 
            lng : '', 
            star : '', 
            travelclose : '', 
            travelopen : ''
          };
      this.props.history.push("/")
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
  }

  render() {
    const { travelname, description, address ,image, image360, lat, lng, star, travelclose, travelopen } = this.state;
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
              ADD BOARD
            </h3>
          </div>
          <div class="panel-body">
            <h4><Link to="/" class="btn btn-primary">Book List</Link></h4>
            <form onSubmit={this.onSubmit}>
              <div class="form-group">
                <label for="title">Title:</label>
                <input type="text" class="form-control" name="title" value={travelname} onChange={this.onChange} placeholder="Title" />
              </div>
              <div class="form-group">
                <label for="description">Description:</label>
                <textArea class="form-control" name="description" onChange={this.onChange} placeholder="Description" cols="80" rows="3">{description}</textArea>
              </div>
              <div class="form-group">
                <label for="author">Author:</label>
                <input type="text" class="form-control" name="author" value={address} onChange={this.onChange} placeholder="Author" />
              </div>
              <button type="submit" class="btn btn-success">Submit</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Create;