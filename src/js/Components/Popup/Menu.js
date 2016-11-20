import {connect} from 'react-redux';
import {bind} from 'decko';
import React from 'react';
import {Component} from 'react';
import classnames from 'classnames';

import _ from 'lodash';

import Popup from '.'

import {startGame} from '../../reducers/game/actions'
import {generatePopup} from '../../reducers/popups/actions'

@connect(state => {
  return {
    menu: state.game.menu
  };
}, dispatch => {
  return {
    startGame: startGame(dispatch),
    generatePopup: generatePopup(dispatch)
  };
})
export default class Menu extends Component {
  state = {
    
  }
  constructor(){
    super();
  }
  render(){
    var props = this.props;
    var state = this.state;
    let scale = state.scale;

    return <div className="popup menu"
      style={{
        width:  1200,
        height: 620,
        left:   40,
        top:    20
      }}
    >
      <div className="status-bar">
        <div className="address-bar">po***ub.com</div>
      </div>
      <div className="title">48 HOURS IN <span>THE LIFE OF A MAN</span></div>    
      <div className="subtitle">Best masterpiece of short production ever</div>    
      <div className="images">
        { _.range(5).map(i => {
          return <img src={`assets/x_${i}.png`} height={200} key={i} alt=""/>
        }) }
      </div>
      <div className="download" onClick={this.download}>CLICK HERE FOR FREE TRIAL ACCESS</div>
    </div>
  }
  @bind
  download() {
    var props = this.props;
    if (props.menu) {
      props.startGame()
    } else {
      props.generatePopup();
      props.generatePopup();
    }
  }
}
