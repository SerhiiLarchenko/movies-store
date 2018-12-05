import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import { deleteMovie } from '../store/actions/sortActions';
import { addToCart } from '../store/actions/cartActions';

const API = 'http://localhost:8000/deletemovie';

class Card extends PureComponent {

  addToCart = () => {
    const { title,year,actors,format,id } = this.props;
    this.props.addToCart({ title,year,actors,format,id });
  }

  deleteMovie = () => {
    this.props.deleteMovie(this.props.id);
    axios.delete(API, {data: {id: this.props.id}})
      .then(data => console.log(data))
      .catch(error => console.log(error));
  }

  render() {
    const {title, year, actors, format} = this.props;
    const stars = actors.join(', ');

    let imgTitle = title.replace(/\W/g,'_');
    try {
      require(`../static/movies/${imgTitle}.jpg`)
    } catch(e) {
      imgTitle = 'movie';
    }
    
    return (
      <div className='col-sm-6 col-md-4 col-lg-3 mb-3'>
        <div className='card h-100 text-center'>
          <img className='card-image-top w-100' 
            src={require(`../static/movies/${imgTitle}.jpg`)}
            alt='movie poster'/>
           <div className='card-body bg-light d-flex flex-column justify-content-between'>
              <div>
                <h5 className='card-title'>{ title }</h5>
                <p className='card-text'>{ year }</p>
                <p className='card-text'>{ stars }</p>
              </div>
              <div className='mt-2 d-flex flex-column'>
              <button className='btn btn-primary mb-1'
                onClick={this.addToCart}> 
                Add to cart
              </button>
              <button className='btn btn-danger'
                onClick={this.deleteMovie}>
                Delete
              </button>
              </div>
          </div>
          <div className='card-footer'>
            { format }
          </div>
        </div>        
      </div>
    )
  }
}

export default connect(null, { addToCart, deleteMovie })(Card);