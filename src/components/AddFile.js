import React, { Component } from 'react';
import { connect } from 'react-redux';
import parseMovieString from '../lib/parseMovieString';

import { loadLocalFile } from '../store/actions/sortActions';

class AddFile extends Component {

  handleChange = (e) => {

    const { files } = e.target;
    if (files.length !== 1) {
      console.log('Please, select one file!');
    } else if (files[0].type !== 'text/plain') {
      console.log(files[0].type);
      console.log('file shoud be txt');
    }     
    else {

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
            this.props.loadLocalFile(
              parseMovieString(result));
          })
          .catch ( error => {
            console.log(error);
          })


      }
    }
    
  render() {
    return (
      <div>
        <label> Load my list </label>
        <input type='file'
        onChange={this.handleChange}/>
      </div>
    )
  }
}

export default connect(null, { loadLocalFile })(AddFile);