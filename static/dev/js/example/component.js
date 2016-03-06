var React = require('react');

var BandComponent = React.createClass({
	render: function() {
        return (
            <div>
                {this.props.examples.map(function(ex) {
                    return (
                        <Band key={ex.title}
                            title={ex.title}
                            image={ex.image}
                            description={ex.description} />
                        );
                })}
            </div>
        );
	}
});

var Band = React.createClass({
    render: function() {
        return (
            <div>
                <h2>{this.props.title}</h2>
                <img src={this.props.image} />
                <p>{this.props.description}</p>
            </div>
        );
    }
});

module.exports = BandComponent;