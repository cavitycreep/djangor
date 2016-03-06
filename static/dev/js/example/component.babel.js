var $ = require('jquery');
var React = require('react');

var ExampleComponent = React.createClass({
    displayName: 'ExampleComponent',

    getExamplesFromServer: function () {
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            cache: false,
            success: function (data) {
                this.setState({ data: data });
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    getInitialState: function () {
        return { data: [] };
    },
    componentDidMount: function () {
        console.log("Component mounted");
        this.getExamplesFromServer();
        setInterval(this.getExamplesFromServer, this.props.pollInterval);
    },
    render: function () {
        return React.createElement(
            'div',
            { className: 'exampleComponent' },
            React.createElement(
                'h1',
                null,
                'Examples'
            ),
            React.createElement(ExampleList, { data: this.state.data })
        );
    }
});

var ExampleList = React.createClass({
    displayName: 'ExampleList',

    render: function () {
        var exampleNodes = this.props.data.map(function (ex) {
            return React.createElement(Example, { title: ex.title, image: ex.image, description: ex.description });
        });

        return React.createElement(
            'div',
            { className: 'exampleList' },
            exampleNodes
        );
    }
});

var Example = React.createClass({
    displayName: 'Example',

    render: function () {
        return React.createElement(
            'div',
            { className: 'example' },
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

module.exports = ExampleComponent;
