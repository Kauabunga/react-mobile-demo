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


    render: function () {


        var content = [];
        for(let i = 0; i < 10000; i++){
            content.push(<div>{'SETTINGS: ' + i}</div>);
        }

        return (
            <div>
                <p>Content for Settings</p>
                <Link to="home">Go Home</Link>


                <div className="spinner" />

                {content}

            </div>
        );
    }
});

module.exports = RouteSettings;

