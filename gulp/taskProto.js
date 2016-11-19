require("babel-register")();
var runSequence = require('run-sequence');
var notifier    = require('node-notifier');
module.exports = function(title, tasks){
  return function(callback){
  	runSequence(
  		...tasks,
    	function(){
    		notifier.notify({
    			title: title,
    			message: '',
    			sound: true
    		});
    		callback();
    	}
    );
  }
}
