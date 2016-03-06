var $ = require('jquery');
var cookie = require('jquery.cookie');
var React = require('react');
var ReactDOM = require('react-dom');
var ExampleComponent = require('./component.babel.js');

var csrfToken = $.cookie('csrftoken');

ReactDOM.render(
    <ExampleComponent url="/api/all/" pollInterval={100000} token={csrfToken} />,
    document.getElementById('content')
);