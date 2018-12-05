import React, { Component } from 'react';
import { connect } from 'react-redux';

import CartCard from './CartCard';
import { emptyCart } from '../store/actions/cartActions';

class Cart extends Component {

  state = { open: false }

  emptyCart = () => {
    this.props.emptyCart();
  }

  toggleCart = () => {
    this.setState({
      open: !this.state.open
    })
  }

  render() {
    const { open } = this.state;
    const cartClass = open ? 'sidelist sidelist--open' : 'sidelist';
    const btnClass = open ? 'tgl-btn tgl-btn--open' : 'tgl-btn';

    const { cart } = this.props;
    const cartList = cart.length ? 
      cart.map(movie => 
        <CartCard
          id={movie.id}
          key={movie.id}
          title={movie.title}
        /> ) : 
      <h3 className='text-light'>
        No added movies
      </h3>;
      
    return (
      <div className={cartClass}>
        <h2 className='text-light'>Cart</h2>
        <div className={btnClass}
          onClick={this.toggleCart} >
          <div></div><div></div><div></div>
        </div>
        { cartList }
        <button className="btn btn-danger"
          onClick={this.emptyCart}>
          Remove all
        </button>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return { cart: state.cart }
}

export default connect(mapStateToProps,{ emptyCart })(Cart);