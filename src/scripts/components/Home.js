'use strict';

var React = require('react');
var Router = require('react-router');
var { Route, RouteHandler, Link } = Router;

require('styles/Home.less');

var Home = React.createClass({
  render: function () {
    return (
        <div>
          <p>Content for Home</p>
          <Link to="login">Go Login</Link>
        </div>
      );
  }
});

module.exports = Home;

