var React = require('react');

var BandComponent = React.createClass({
    displayName: 'BandComponent',

    render: function () {
        return React.createElement(
            'div',
            null,
            this.props.examples.map(function (ex) {
                return React.createElement(Band, { key: ex.title,
                    title: ex.title,
                    image: ex.image,
                    description: ex.description });
            })
        );
    }
});

var Band = React.createClass({
    displayName: 'Band',

    render: function () {
        return React.createElement(
            'div',
            null,
            React.createElement(
                'h2',
                null,
                this.props.title
            ),
            React.createElement('img', { src: this.props.image }),
            React.createElement(
                'p',
                null,
                this.props.description
            )
        );
    }
});

module.exports = BandComponent;
