var ExampleComponent = require('./component.babel.js');
var React = require('react');
var ReactDOM = require('react-dom');
ReactDOM.render(
  React.createElement(ExampleComponent, null),
  document.getElementById('content')
);