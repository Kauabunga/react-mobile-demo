'use strict';

var React = require('react');
var Router = require('react-router');
var { Route, RouteHandler, Link } = Router;

require('styles/Login.less');

var Login = React.createClass({
  render: function () {
    return (
        <div>
          <p>Content for Login</p>
          <Link to="quickaccess">Go Quickaccess</Link>
          <Link to="home">Go Home</Link>
        </div>
      );
  }
});

module.exports = Login;

