var React = require('react');
var ReactDOM = require('react-dom');
var ExampleComponent = require('./component.babel.js');

var examples = [{ title: "Test1", image: "https://biblicalpreaching.files.wordpress.com/2013/02/example.jpg", description: "This is only a test..." }];

ReactDOM.render(React.createElement(ExampleComponent, { examples: examples }), document.getElementById('content'));
