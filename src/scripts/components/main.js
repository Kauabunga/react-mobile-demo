'use strict';

var ReactWebpackRound2App = require('./ReactWebpackRound2App');
var React = require('react');
var Router = require('react-router');
var { Route, RouteHandler, Link } = Router;


var content = document.getElementById('content');

var RouteLogin = require('./routes/RouteLogin');
var RouteQuickaccess = require('./routes/RouteQuickaccess');
var RouteHome = require('./routes/RouteHome');



var Routes = (
    <Route handler={ReactWebpackRound2App}>

        <Route name="login" handler={RouteLogin}/>
        <Route name="quickaccess" handler={RouteQuickaccess}/>

        <Route name="home" path="/" handler={RouteHome}/>

    </Route>
);

Router.run(Routes, function (Handler) {
    React.render(<Handler/>, content);
});




