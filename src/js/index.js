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

setInterval(() => {
  let state = store.getState();
  if (state.popups.length < 10) generatePopup(store.dispatch)();
}, 1000);

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
