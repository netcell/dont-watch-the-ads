window.getCurrentTimeout = (closedPopup, popupsLength) => {
  if (closedPopup == 0 && popupsLength == 0) return 0;
  else return 1500 - Math.pow(closedPopup, 1/4) * 300 >> 0;
}

import Promise from 'bluebird';
window.Promise = Promise;

import React from 'react';
import ReactDOM from 'react-dom';

import configureStore from './configureStore';
import classnames from 'classnames';
window.classnames = classnames;

import FastClick from 'react-fastclick-alt';
// var attachFastClick = require('fastclick');
// attachFastClick(document.body);

window.$ajax = function(){
	return Promise.resolve($.ajax(...arguments));
}

const store = configureStore();

import {generatePopup} from './reducers/popups/actions'
import {gameOver} from './reducers/game/actions'

createjs.Sound.registerSound("assets/beep.mp3", 'beep');
function playBeep() {
  let id = 'beep';
  createjs.Sound.play(id);
}
let beeped = false;
function schedule() {
  let state = store.getState();
  if (!beeped && state.popups.length >= 10 && !state.game.game_over) {
    beeped = true;
    playBeep();
    setTimeout(gameOver(store.dispatch), 2000); 
  } else if (!state.game.menu && state.popups.length < 10) {
    // if (state.common.closedPopup == 0 && state.popups.length == 0) {
    //   generatePopup(store.dispatch)();
    //   generatePopup(store.dispatch)();
    //   generatePopup(store.dispatch)();
    // } else {
      generatePopup(store.dispatch)();
      beeped = false;
    // }
  } else beeped = false;
  setTimeout(schedule, getCurrentTimeout(state.common.closedPopup, state.popups.length));
}
let state = store.getState();
setTimeout(schedule, 0);

let root;
function init() {
	let RootScreen = require('./RootScreen').default;
	root = ReactDOM.render(<FastClick><RootScreen store={store} /></FastClick>, document.getElementById('game'));
}
$(function(){
	// fastclick(document.body);
	init();
})

/* debug:start */
/**
 * HOT RELOAD IMPLEMENTATION FOR COMPONENTS
 */
if (module.hot) {
	module.hot.setUpdateMode('websocket', {
		url: 'http://' + location.hostname + ':3123'
	})
	module.hot.accept('./RootScreen', () => requestAnimationFrame( () => {
		init();
	}) );
}
/* debug:stop */
