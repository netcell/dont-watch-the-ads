import {connect} from 'react-redux';
import {bind} from 'decko';
import React from 'react';
import {Component} from 'react';
import classnames from 'classnames';

import Popup from '.'

@connect(state => {
  return {};
}, dispatch => {
  return {
    
  };
})
export default class SimplePopup extends Component {
  state = {
    
  }
  constructor(){
    super();
  }
  render(){
    var props = this.props;
    var state = this.state;
    let scale = state.scale;

    return <Popup
      id                = {props.id}
      image             = {props.image}
      confirm            = {props.confirm}
      width             = {props.width}
      height            = {props.height}
      left              = {props.left}
      top               = {props.top}
      close_button_side = {props.close_button_side}
    >        
      {props.children}
    </Popup>
  }
}
