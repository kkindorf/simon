var React = require('react');
var ReactDOM = require("react-dom");
var SimonContainer = require('./components/simonContainer.js');
document.addEventListener('DOMContentLoaded', function(){
  ReactDOM.render(<SimonContainer/>, document.getElementById('app'));
})
