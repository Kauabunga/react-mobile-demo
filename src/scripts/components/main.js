'use strict';


var dispatcher = require('../dispatcher/ReactWebpackRound2AppDispatcher');

var ReactWebpackRound2App = require('./ReactWebpackRound2App');
var React = require('react');
var Router = require('react-router');
var { Route, RouteHandler, Link } = Router;


var content = document.getElementById('content');


var RouteLogin = require('./routes/RouteLogin');
var RouteQuickaccess = require('./routes/RouteQuickaccess');
var RouteHome = require('./routes/RouteHome');
var RouteSettings = require('./routes/RouteSettings');


var WebworkerService = require('./webworker/WebworkerService');


if(window){
    require('styles/main.css');
    require('styles/material.less');
    require('./auth/FormQuickaccess.less');
    require('styles/transition.less');
}



var Routes = exports.Routes = (
    <Route handler={ReactWebpackRound2App}>

        <Route name="login" handler={RouteLogin}/>
        <Route name="quickaccess" handler={RouteQuickaccess}/>

        <Route name="home" path="/" handler={RouteHome}/>
        <Route name="settings" handler={RouteSettings}/>

    </Route>
);




Router.run(Routes, function (Handler, state) {


    //let webworkerRender = true;
    let webworkerRender = false;
    let startRenderTime = Date.now();

    if( ! webworkerRender) {

        /////////////////////
        // ORIGINAL RENDER //
        /////////////////////

        console.log('React rendering');

        React.render(<Handler/>, content);

        setTimeout(() => {
            console.log('React rendering time', Date.now() - startRenderTime);
        });

    }
    else {

        //////////////////////
        // WEBWORKER RENDER //
        //////////////////////

        console.log('React webworker rendering');

        var registerToken = dispatcher.register((payload) => {
            var {namespace, event, render} = payload;
            if(namespace === 'main' && event === 'renderresponse'){

                content.innerHTML = render;
                React.render(<Handler/>, content);

                dispatcher.unregister(registerToken);
                setTimeout(() => {
                    console.log('React webworker rendering time', Date.now() - startRenderTime);
                });
            }
        });

        setTimeout(() => {
            dispatcher.dispatch({
                namespace: 'main',
                event: 'renderrequest',
                path: state.pathname
            });
        });
    }

});




