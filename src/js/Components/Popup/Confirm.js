import {connect} from 'react-redux';
import {bind} from 'decko';
import React from 'react';
import {Component} from 'react';
import {Provider} from 'react-redux';
import classnames from 'classnames';

export default class Popup extends Component {
  state = {
    
  }
  constructor(){
    super();
  }
  @bind
  onClick() {

  }
  render(){
    var props = this.props;
    var state = this.state;
    let scale = state.scale;

    let width  = 300;
    let height = 150;

    return <div className="popup confirm"
      style={{
        width, height,
        left: (props.parentWidth - width)/2,
        top:  (props.parentHeight - height)/2
      }}
    >
      <div className="title">
        Are you sure?
      </div>
      <div className="buttons">
        <div className="yes" onClick={props.onYes}>
          Yes
        </div>
        <div className="no" onClick={props.onNo}>
          No
        </div>
      </div>
    </div>
  }
}
