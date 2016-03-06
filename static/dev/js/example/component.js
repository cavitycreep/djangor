var React = require('react');
module.exports = React.createClass({
    clickButton: function() {
        alert("You clicked the button!");
    },
	render: function() {
        return <button onClick={this.clickButton}>Click Me</button>;
	}
});