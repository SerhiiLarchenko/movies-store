import React, { Component } from 'react';
import { connect } from 'react-redux';

import { removeFromCart } from '../store/actions/cartActions';

class CartCard extends Component {

  removeFromCart = () => {
    this.props.removeFromCart(this.props.id);
  }

  render() {
    const { title } = this.props;
    const imgTitle = title.replace(/\W/g,'_');

    return (
      <div className='wide-card'>
        <img className='wide-card__image' 
          src={require(`../static/movies/${imgTitle}.jpg`)}
          alt='movie poster'/>
        <div className='wide-card__title'>{ title }</div>
        <button className='wide-card__btn btn btn-sm btn-light'
          onClick={this.removeFromCart}>
          X
        </button>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return { cart: state.cart }
}

export default connect(mapStateToProps, { removeFromCart })(CartCard);