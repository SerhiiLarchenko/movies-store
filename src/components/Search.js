import React, { Component } from 'react';
import { connect } from 'react-redux';
import Joi from 'joi-browser';

import { search, cancelSearch } from '../store/actions/searchActions';
import { addAlert } from '../store/actions/alertActions';

class Search extends Component {

  handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      word: e.target.search.value.toLowerCase(),
      category: e.target.select.value
    }

    const schema = Joi.string().min(3).max(30);

    Joi.validate(payload.word, schema, error => {
      if (error) {
        const box = e.target.getBoundingClientRect();
        this.props.addAlert({
          x: box.x,
          y: box.y,
          msg: error.details[0].message
        });
      } else {
        this.props.search(payload);
      }
    });
    
    e.target.search.value = '';
  }

  resetList = () => {
    this.props.cancelSearch();
  }

  render() {
    return (
      <div className='col-lg-7 text-center'>
        <div className='d-inline-block'>
          <form className='form-inline' 
            onSubmit={this.handleSubmit}>
            <input className='form-control mr-1 mb-3'
              onClick={this.resetList}
              name='search' 
              placeholder='Search' />
            <div className='mb-3 mx-auto'>
              <button className='btn btn-outline-dark mr-1'>
                Search
              </button>
              <select className='btn btn-outline-dark mr-1' 
                name='select'>
                <option>Movie</option>
                <option>Actor</option>
              </select>
              <div className='btn btn-outline-dark'
                onClick={this.resetList}>
                Return
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    search: state.search
  }
}

export default connect(mapStateToProps, { 
  search, cancelSearch, addAlert })(Search);