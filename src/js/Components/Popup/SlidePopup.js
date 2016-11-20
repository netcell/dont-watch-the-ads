import {connect} from 'react-redux';
import {bind} from 'decko';
import React from 'react';
import {Component} from 'react';
import classnames from 'classnames';

import {CLOSE_BUTTON_SIDE, closePopup} from '../../reducers/popups/actions.js'
import ReactGesture from 'react-gesture';

import Popup from '.'

@connect(state => {
  return {};
}, dispatch => {
  return {
    closePopup: closePopup(dispatch)
  };
})
export default class SimplePopup extends Component {
  state = {
    closed: false
  }
  constructor(){
    super();
  }
  @bind
  close() {
    if (this.state.closed) return;
    this.setState({closed: true})
    var props = this.props;
    this.props.closePopup(this.props.id);
  }
  render(){
    var props = this.props;
    var state = this.state;
    let scale = state.scale;

    return <Popup
      id                    = {props.id}
      image                 = {props.image}
      width                 = {props.width}
      height                = {props.height}
      left                  = {props.left}
      top                   = {props.top}
      close_button_side     = {props.close_button_side}
      close_button_disabled = {true}
    >        
      {props.children}
      { props.close_button_side == CLOSE_BUTTON_SIDE.LEFT ? 
        <ReactGesture
          onSwipeLeft={this.close}>
          <div className="slider left">Slide to close</div>
        </ReactGesture>
        :
        <ReactGesture
          onSwipeRight={this.close}>
          <div className="slider right">Slide to close</div>
        </ReactGesture>  
      }
    </Popup>
  }
}
