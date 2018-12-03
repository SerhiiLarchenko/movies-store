import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import { addToCart } from '../store/actions/cartActions';

class Card extends PureComponent {

  addToCart = () => {
    const { title,year,actors,format,id } = this.props;
    this.props.addToCart({ title,year,actors,format,id });
  }

  render() {
    const {title, year, actors, format} = this.props;
    const stars = actors.join(', ');
    const imgTitle = title.replace(/\W/g,'_');
    
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
              <div className='mt-2'>
              <button className='btn btn-primary'
                onClick={this.addToCart}> 
                Add to list
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

export default connect(null, { addToCart })(Card);