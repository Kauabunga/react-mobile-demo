'use strict';

var React = require('react');
var Router = require('react-router');
var { Route, RouteHandler, Link } = Router;


/**
 *
 * @type {*|Function}
 */
var RouteSettings = React.createClass({


    getInitialState: function () {
        return {};
    },

    componentWillReceiveProps: function (nextProps) {
        if (this.props.isActive === false && nextProps.isActive) {
            console.log('Reinitialising route', nextProps);
            this.setState(this.getInitialState());
        }
    },


    render: function () {
        return (
            <div>
                <p>Content for Settings</p>
                <Link to="home">Go Home</Link>
            </div>
        );
    }
});

module.exports = RouteSettings;

