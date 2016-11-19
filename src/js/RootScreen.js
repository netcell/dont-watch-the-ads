import {connect} from 'react-redux';
import {bind} from 'decko';
import React from 'react';
import { Component } from 'react';
import { Provider } from 'react-redux';
import config from 'config.common';
var width  = config.width;
var height = config.height;
var ratio  = width/height;

import _ from 'lodash';

import SimplePopup from './Components/Popup/SimplePopup'
import SlidePopup from './Components/Popup/SlidePopup'
import {CLOSE_BUTTON_SIDE, POPUP_TYPE, generatePopup} from './reducers/popups/actions'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import {startGame} from './reducers/game/actions';

@connect(state => {
  return {
    popups: state.popups
  }
}, dispatch => {
  return {
    generatePopup: generatePopup(dispatch),
    startGame: startGame(dispatch)
  }
})
export default class RootScreen extends Component {
  state = {
    scale: 1
  }
  constructor(){
    super();
  }
  componentDidMount(){
    $(window).on('resize', this.resizeToFitScreen);
    this.resizeToFitScreen();
  }
  componentWillUnmount(){
    $(window).off('resize', this.resizeToFitScreen);
    this.interval && clearInterval(this.interval);
  }
  @bind
  resizeToFitScreen(){
    let bodyWidth = $(window).width();
    let bodyHeight = $(window).height();
    let bodyRatio = bodyWidth/bodyHeight;
    let scale = 1;
    if (bodyRatio >= ratio && bodyHeight < height) {
      scale = bodyHeight / height;
    } else if (bodyRatio < ratio && bodyWidth < width) {
      scale = bodyWidth / width;
    }
    this.setState({ scale });
  }
  render(){
    var props = this.props;
    var state = this.state;
    let scale = state.scale;

    let popups = props.popups.map(popup => {
      switch(popup.type) {
        case POPUP_TYPE.SIMPLE: {
          return <SimplePopup
            key={popup.id} id={popup.id}
            width={popup.config.size.width} height={popup.config.size.height}
            left={popup.position.x} top={popup.position.y}
            close_button_side={popup.close_button_side}
            image={popup.config.image}
          >
            
          </SimplePopup>
        }
        case POPUP_TYPE.SLIDE: {
          return <SlidePopup
            key={popup.id} id={popup.id}
            width={popup.config.size.width} height={popup.config.size.height}
            left={popup.position.x} top={popup.position.y}
            close_button_side={popup.close_button_side}
            image={popup.config.image}
          >
            
          </SlidePopup>
        }
      }
    })

    return <Provider store={ props.store }>
      <div className="root-container">
        <div className='screen-container' style={{
          transform: `matrix(${scale}, 0, 0, ${scale}, 0, 0)`
        }}>
          <ReactCSSTransitionGroup
            transitionName="translate-popup"
            transitionEnter={true}
            transitionLeave={true}
            transitionLeaveTimeout={300}
            transitionEnterTimeout={300}
          >
            {popups}
          </ReactCSSTransitionGroup>
          <div className="progress-bar">
            { _.range(10).map(i => {
              return <div className={`progress-tile ${i < props.popups.length ? 'show' : ''}`} key={i}>
              </div>
            }) }
          </div>
          {props.popups.length < 10 ? null :
            <div className="gameover" onClick={props.startGame}></div>
          }
        </div>
      </div>
    </Provider>
  }
}
