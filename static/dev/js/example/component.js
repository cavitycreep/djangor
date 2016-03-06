var $ = require('jquery');
var React = require('react');

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
            </div>
        );
	}
});

var ExampleList = React.createClass({
    render: function() {
        var exampleNodes = this.props.data.map(function(ex) {
            return (
                <Example title={ex.title} image={ex.image} description={ex.description} />
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
                <h2>{this.props.title}</h2>
                <img src={this.props.image} />
                <p>{this.props.description}</p>
            </div>
        );
    }
});

module.exports = ExampleComponent;