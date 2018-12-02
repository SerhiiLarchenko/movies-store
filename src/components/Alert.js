import React, { Component } from 'react';
import { connect } from 'react-redux';

import { confirmAlert } from '../store/actions/alertActions';

class Alert extends Component {

  confirmAlert = () => {
    this.props.confirmAlert();
  }

  render(){
    const {x,y,msg} = this.props.alert;

    return (
      msg ? <div className='alert alert-danger'
        style={{left: x+'px', top: y+'px', position: 'fixed'}}>
        {msg}
        <div className='text-center'>
        <button className='btn btn-light'
          onClick={this.confirmAlert}>
          OK
          </button>
        </div>  
      </div> : null
    )
  }
}

const mapStateToProps = state => {
  return { alert: state.alert }
}  

export default connect(mapStateToProps, { confirmAlert })(Alert);