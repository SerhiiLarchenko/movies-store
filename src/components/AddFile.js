import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import parseMovieString from '../lib/parseMovieString';

import { loadLocalFile } from '../store/actions/sortActions';
import { addAlert } from '../store/actions/alertActions';

const API = 'http://localhost:8000/movies'

class AddFile extends Component {

  handleChange = (e) => {

    const { files } = e.target;
    const box = e.target.getBoundingClientRect();
    const { x, y } = box;
    const warn = {x, y, msg:''};
    const { addAlert } = this.props;
    
    if (files.length !== 1) {
      warn.msg = 'Please, select one file!';
      addAlert(warn);
    } else if (files[0].type !== 'text/plain') {
      warn.msg = 'file shoud be txt';
      addAlert(warn);
    } else {

        function readTextFile (file) {
          return new Promise((resolve, reject) => {
            let reader = new FileReader();
            reader.addEventListener(
              'load', () => resolve(reader.result));
            reader.addEventListener(
              'error', () => reject(reader.error));
            reader.readAsText(file);            
          });
        }

        readTextFile(files[0])
          .then( result => {
            const movies = parseMovieString(result);
            this.props.loadLocalFile(movies);
            axios.post(API, movies)
              .then( res => {
                warn.msg = res.data;
                addAlert(warn);
              })
              .catch( error => console.log(error));
          })
          .catch ( error => {
            console.log(error);
          });
      }
    }
    
  render() {
    return (
      <div className='col-sm-5'>
        <div className="text-center mb-3">
          <input className='btn btn-outline-dark'
            type='file'
            onChange={this.handleChange}/>
        </div>    
      </div>
    )
  }
}

export default connect(null, { loadLocalFile, addAlert })(AddFile);