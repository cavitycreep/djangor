var $ = require('jquery');
var React = require('react');
var ButtonInput = require('react-bootstrap').ButtonInput;
var Input = require('react-bootstrap').Input;
var Image = require('react-bootstrap').Image;

var ExampleComponent = React.createClass({
    getExamplesFromServer: function() {
        $.ajax({
          url: this.props.url,
          dataType: 'json',
          cache: false,
          success: function(data) {
              this.setState({data: data});
          }.bind(this),
          error: function(xhr, status, err) {
              console.error(this.props.url, status, err.toString());
          }.bind(this)
        });
    },
    handleExampleSubmit: function(example) {
        var examples = this.state.data;
        example.id = Date.now();
        example.date_added = Date.now();
        var exampleArray = [example,];

        var newExamples = exampleArray.concat(examples);
        this.setState({data: newExamples});

        $.ajax({
            url: this.props.url,
            dataType: 'json',
            type: 'POST',
            data: example,
            error: function(xhr, status, err) {
                this.setState({data: examples});
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    getInitialState: function() {
        return {data: []};
    },
    componentDidMount: function() {
        console.log("Component mounted");
        this.getExamplesFromServer();
        setInterval(this.getExamplesFromServer, this.props.pollInterval);
    },
	render: function() {
        return (
            <div className="exampleComponent">
                <h1>Examples</h1>
                <ExampleList data={this.state.data} />
                <h3>Submit New Example</h3>
                <ExampleForm onExampleSubmit={this.handleExampleSubmit} token={this.props.token} />
            </div>
        );
	}
});

var ExampleForm = React.createClass({
    getInitialState: function() {
        return {title: '', image: '', description: ''};
    },
    handleTitleChange: function(e) {
        this.setState({title: e.target.value});
    },
    handleImageChange: function(e) {
        this.setState({image: e.target.value});
    },
    handleDescriptionChange: function(e) {
        this.setState({description: e.target.value});
    },
    handleSubmit: function(e) {
        e.preventDefault();

        var title = this.state.title.trim();
        var image = this.state.image.trim();
        var description = this.state.description.trim();

        if(title && image && description)
        {
            this.props.onExampleSubmit({title: title, image: image, description: description, csrfmiddlewaretoken: this.props.token});
            this.setState({title: '', image: '', description: ''});
        }
    },
    render: function() {
        return (
            <form className="exampleForm form-horizontal" onSubmit={this.handleSubmit}>
                <Input type="text" label="Title" value={this.state.title} onChange={this.handleTitleChange} labelClassName="col-xs-2" wrapperClassName="col-xs-10" />
                <Input type="text" label="Image" value={this.state.image} onChange={this.handleImageChange} labelClassName="col-xs-2" wrapperClassName="col-xs-10" />
                <Input type="textarea" label="Description" value={this.state.description} onChange={this.handleDescriptionChange} labelClassName="col-xs-2" wrapperClassName="col-xs-10" />
                <ButtonInput type="submit" value="Submit" bsSize="small" wrapperClassName="col-xs-offset-2 col-xs-10" />
            </form>
        );
    }
});

var ExampleList = React.createClass({
    render: function() {
        var exampleNodes = this.props.data.map(function(ex) {
            return (
                <Example title={ex.title} image={ex.image} description={ex.description} date={ex.date_added} />
            );
        });

        return (
            <div className="exampleList">
                {exampleNodes}
            </div>
        );
    }
});

var Example = React.createClass({
    render: function() {
        return (
            <div className="example">
                <h2>{this.props.title} <small>{this.props.date}</small></h2>
                <Image src={this.props.image} responsive />
                <p>{this.props.description}</p>
            </div>
        );
    }
});

module.exports = ExampleComponent;