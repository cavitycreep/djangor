var React = require('react');
module.exports = React.createClass({
    displayName: "exports",

    clickButton: function () {
        alert("You clicked the button!");
    },
    render: function () {
        return React.createElement(
            "button",
            { onClick: this.clickButton },
            "Click Me"
        );
    }
});
