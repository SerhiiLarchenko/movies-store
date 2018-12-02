import React, { Component } from 'react';
import { connect } from 'react-redux';

import { 
  sortByTitles, sortByYear, sortByFormat, shuffle 
} from '../store/actions/sortActions';

class Sort extends Component {

  sortByTitle = () => {
    this.props.sortByTitles();
  }

  sortByYear = () => {
    this.props.sortByYear();
  }

  sortByFormat = () => {
    this.props.sortByFormat();
  }

  shuffle = () => {
    this.props.shuffle();
  }

  render() {
    return (
      <div className='col-lg-5 text-center'>
        <div className='d-inline-block mb-3 mr-3'>
          Sort by:
        </div>
        <div className='d-inline-block mb-3'>
          <div className='btn-group'>
              <button 
                className='btn btn-outline-dark'
                onClick={this.sortByTitle}>
                Title
              </button>
              <button 
                className='btn btn-outline-dark'
                onClick={this.sortByYear}>
                Year
              </button>
              <button 
                className='btn btn-outline-dark'
                onClick={this.sortByFormat}>
                Format
              </button>
              <button 
                className='btn btn-outline-dark'
                onClick={this.shuffle}>
                Shuffle
              </button>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(null, {
  sortByTitles, sortByYear, sortByFormat, shuffle 
})(Sort);