'use strict';

var React = require('react');
var Router = require('react-router');
var { Route, RouteHandler, Link } = Router;


/**
 *
 * @type {*|Function}
 */
var RouteHome = React.createClass({


    getInitialState: function () {
        return {};
    },

    render: function () {


        var dummy = [];
        for(let i = 0; i < 10000; i++){
            dummy.push(<div>{'HOME: ' + i}</div>);
        }

        return (
            <div>
                <p>Content for Home</p>
                <Link to="login">Go Login</Link>
                <Link to="settings">Go Settings</Link>

                <div className="spinner" />

                {dummy}
            </div>
        );
    }
});

module.exports = RouteHome;

