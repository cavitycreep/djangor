var $ = require('jquery');
var React = require('react');
var ButtonInput = require('react-bootstrap').ButtonInput;
var Input = require('react-bootstrap').Input;
var Image = require('react-bootstrap').Image;

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
    handleExampleSubmit: function (example) {
        var examples = this.state.data;
        example.id = Date.now();
        example.date_added = Date.now();
        var exampleArray = [example];

        var newExamples = exampleArray.concat(examples);
        this.setState({ data: newExamples });

        $.ajax({
            url: this.props.url,
            dataType: 'json',
            type: 'POST',
            data: example,
            error: function (xhr, status, err) {
                this.setState({ data: examples });
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
            React.createElement(ExampleList, { data: this.state.data }),
            React.createElement(
                'h3',
                null,
                'Submit New Example'
            ),
            React.createElement(ExampleForm, { onExampleSubmit: this.handleExampleSubmit, token: this.props.token })
        );
    }
});

var ExampleForm = React.createClass({
    displayName: 'ExampleForm',

    getInitialState: function () {
        return { title: '', image: '', description: '' };
    },
    handleTitleChange: function (e) {
        this.setState({ title: e.target.value });
    },
    handleImageChange: function (e) {
        this.setState({ image: e.target.value });
    },
    handleDescriptionChange: function (e) {
        this.setState({ description: e.target.value });
    },
    handleSubmit: function (e) {
        e.preventDefault();

        var title = this.state.title.trim();
        var image = this.state.image.trim();
        var description = this.state.description.trim();

        if (title && image && description) {
            this.props.onExampleSubmit({ title: title, image: image, description: description, csrfmiddlewaretoken: this.props.token });
            this.setState({ title: '', image: '', description: '' });
        }
    },
    render: function () {
        return React.createElement(
            'form',
            { className: 'exampleForm form-horizontal', onSubmit: this.handleSubmit },
            React.createElement(Input, { type: 'text', label: 'Title', value: this.state.title, onChange: this.handleTitleChange, labelClassName: 'col-xs-2', wrapperClassName: 'col-xs-10' }),
            React.createElement(Input, { type: 'text', label: 'Image', value: this.state.image, onChange: this.handleImageChange, labelClassName: 'col-xs-2', wrapperClassName: 'col-xs-10' }),
            React.createElement(Input, { type: 'textarea', label: 'Description', value: this.state.description, onChange: this.handleDescriptionChange, labelClassName: 'col-xs-2', wrapperClassName: 'col-xs-10' }),
            React.createElement(ButtonInput, { type: 'submit', value: 'Submit', bsSize: 'small', wrapperClassName: 'col-xs-offset-2 col-xs-10' })
        );
    }
});

var ExampleList = React.createClass({
    displayName: 'ExampleList',

    render: function () {
        var exampleNodes = this.props.data.map(function (ex) {
            return React.createElement(Example, { title: ex.title, image: ex.image, description: ex.description, date: ex.date_added });
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
                this.props.title,
                ' ',
                React.createElement(
                    'small',
                    null,
                    this.props.date
                )
            ),
            React.createElement(Image, { src: this.props.image, responsive: true }),
            React.createElement(
                'p',
                null,
                this.props.description
            )
        );
    }
});

module.exports = ExampleComponent;
