var React = require('react');
var ReactDOM = require('react-dom');
var ExampleComponent = require('./component.babel.js');
ReactDOM.render(
    <ExampleComponent url="/api/all/?format=json" pollInterval={100000} />,
    document.getElementById('content')
);