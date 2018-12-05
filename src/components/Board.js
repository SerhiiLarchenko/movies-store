import React, { Component } from 'react';
import { connect } from 'react-redux';

import Card from './Card';
import Loader from './Loader';

import { loadMovies } from '../store/actions/sortActions';

class Board extends Component {

  state = {
    loaded: false
  }

  componentWillMount() {
    this.props.loadMovies(
      this.setState.bind(this)
    );
  }

  render() {

    let { movies, search } = this.props;
    const { word, category } = search;
    
    if (word) {
      switch(category) {

        case 'Movie':
          movies = movies.filter( movie => 
            movie.title.toLowerCase().includes(word) ||
              word.includes(movie.title.toLowerCase()));
                break;

        case 'Actor':
          movies = movies.filter(movie => 
            movie.stars.some(actor => 
              actor.toLowerCase().includes(word) ||
                word.includes(actor.toLowerCase())));
                  break;
        
        default: break;
      }
    }
      
    const moviesList = movies.length ? movies.map(movie => {
      return (
        <Card
          title={movie.title} 
          year={movie['release year']}
          actors={movie.stars}
          format={movie.format}
          key={movie.id}
          id={movie.id}
        />
      )
    }) : <h3>No results</h3>;

    return (
      this.state.loaded ?
        <div className='container'>
          <div className='row'>
              {moviesList}
          </div>
        </div> : <Loader />
    );
  }
}

const mapStateToProps = (state) => {
  return { 
    movies: state.movies,
    search: state.search        
  }
}

export default connect(mapStateToProps, { loadMovies })(Board);