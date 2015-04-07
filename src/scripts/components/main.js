'use strict';

var ReactWebpackRound2App = require('./ReactWebpackRound2App');
var React = require('react');
var Router = require('react-router');
var { Route, RouteHandler, Link } = Router;


var content = document.getElementById('content');


var Login = require('./Login');
var Quickaccess = require('./Quickaccess');
var Home = require('./Home');

var Routes = (
  <Route handler={ReactWebpackRound2App}>
    <Route name="login" handler={Login}/>
    <Route name="quickaccess" handler={Quickaccess}/>

    <Route name="home" path="/" handler={Home}/>
  </Route>
);

Router.run(Routes, function (Handler) {
  React.render(<Handler/>, content);
});




