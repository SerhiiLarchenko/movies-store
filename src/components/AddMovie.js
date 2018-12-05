import React, { Component } from 'react';
import { connect } from 'react-redux';
import Joi from 'joi-browser';
import axios from 'axios';

import { addMovie } from '../store/actions/sortActions';
import { addAlert } from '../store/actions/alertActions';

const API = 'http://localhost:8000/addmovie';

class AddMovie extends Component { 

  state = { visible: false}

  showForm = () => this.setState({ visible: true});
  hideForm = () => this.setState({ visible: false});

  handleSubmit = (e) => {

    e.preventDefault();

    const schema = Joi.object().keys({
      title: Joi.string().min(3).max(30).required(),
      'release year': Joi.number().integer().min(1895).max(2018).required(),
      stars: Joi.string().min(3).max(100).required(),
      format: Joi.string().min(3).max(7).required()
    });

    const { title, year, actors, format } = e.target;
    const movie = {
      title: title.value,
      'release year': +year.value,
      stars: actors.value,
      format: format.value
    }

    const box = e.target.getBoundingClientRect();
    const { x, y } = box;
    const warn = { x, y };

    Joi.validate(movie, schema, error => {

      if (error) {
        warn.msg = error.details[0].message;
        this.props.addAlert(warn);
      } else {
        movie.stars = movie.stars.split(',').map(actor => {
          return actor.trim();});
        movie.id = movie['release year']*Math.random();
        this.props.addMovie(movie);
        title.value = year.value = actors.value = format.value = '';
        this.hideForm();

        axios.post(API, movie)
          .then( res => {
            console.log(res.body);
          })
          .catch( error => console.log(error));
      }
    })
  }

  render() {
    return (
    <div className='col-sm-3'>
      <div className="text-center mb-3">
      <button className='btn btn-outline-dark'
        onClick={this.showForm}>
        Add movie
      </button>
      </div>
      { this.state.visible ?
        <div className='movie-form'>
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
            <input className="form-control" 
              type='text' name='title'
              placeholder='Enter movie title'/>
            </div>
            <div className="form-group">
            <input className="form-control" 
              type='text' name='year'
              placeholder='Enter release year'/>
            </div>
            <div className="form-group">
            <input className="form-control" 
              type='text' name='actors'
              placeholder='Enter stars names separated by commas'/>
            </div>
            <div className="form-group">
            <input className="form-control" 
              type='text' name='format'
              placeholder='Enter movie format'/>
            </div>
            <div className="text-center">
              <button className='btn btn-primary' 
                type='submit'> 
                Add movie
              </button>
              <div className="d-inline-block btn btn-secondary ml-2"
                onClick={this.hideForm}>
                Cancel
              </div>
            </div>
          </form>
        </div> : null }
    </div>
    )
  }
}

export default connect(null, {addAlert, addMovie})(AddMovie);