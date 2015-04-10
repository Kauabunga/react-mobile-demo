'use strict';

var ReactWebpackRound2App = require('./ReactWebpackRound2App');
var React = require('react');
var Router = require('react-router');
var { Route, RouteHandler, Link } = Router;


var content = document.getElementById('content');

var RouteLogin = require('./routes/RouteLogin');
var RouteQuickaccess = require('./routes/RouteQuickaccess');
var RouteHome = require('./routes/RouteHome');
var RouteSettings = require('./routes/RouteSettings');

//TODO this is all somewhat redundant with pre-rendered routes?


var WebWorker = require('worker!./webworker/webworker');
var worker = new WebWorker();

console.log(worker);

worker.onmessage = function(asdf){
    console.log('asdf', asdf);

    setTimeout(() => {
        worker.postMessage(['mooo']);
    }, 200);
};



worker.postMessage(['mooo']);





var Routes = (
    <Route handler={ReactWebpackRound2App}>

        <Route name="login" handler={RouteLogin}/>
        <Route name="quickaccess" handler={RouteQuickaccess}/>

        <Route name="home" path="/" handler={RouteHome}/>
        <Route name="settings" handler={RouteSettings}/>

    </Route>
);

Router.run(Routes, function (Handler) {
    React.render(<Handler/>, content);
});




