import {connect} from 'react-redux';
import {bind} from 'decko';
import React from 'react';
import {Component} from 'react';
import {Provider} from 'react-redux';
import classnames from 'classnames';
import {CLOSE_BUTTON_SIDE, closePopup} from '../../reducers/popups/actions.js'
import Confirm from './Confirm';

import _ from 'lodash';

@connect(state => {
  return {};
}, dispatch => {
  return {
    closePopup: closePopup(dispatch)
  };
})
export default class Popup extends Component {
  state = {
    
  }
  constructor(){
    super();
  }
  @bind
  close() {
    var props = this.props;
    this.props.closePopup(this.props.id);
  }
  @bind
  statusBarCloseButtonClicked() {
    var props = this.props;
    if (!props.hide_close_button && !props.close_button_disabled) {
      // if (props.confirm) this.toggleConfirm()
      this.close();
    }
  }
  @bind
  toggleConfirm(){
    this.setState({ confirm: !this.state.confirm });
  }
  render(){
    var props = this.props;
    var state = this.state;
    let scale = state.scale;

    return <div className="popup"
      style={{
        width:  props.width,
        height: props.height,
        left:   props.left,
        top:    props.top
      }}
    >
      <div className="status-bar">
        {props.hide_close_button ? null :
          <a
            className={ classnames({
              'close-button': true,
              'left':         props.close_button_side == CLOSE_BUTTON_SIDE.LEFT,
              'right':        props.close_button_side == CLOSE_BUTTON_SIDE.RIGHT,
              'disabled':     props.close_button_disabled
            }) }
          >
            <span>x</span>
            <div 
              className = "clickable"
              onClick   = { this.statusBarCloseButtonClicked }
            ></div>
          </a>
        }
      </div>
      <img src={ `assets/${props.image}` } width={props.width} alt=""/>
      {props.children}
    </div>
  }
}
