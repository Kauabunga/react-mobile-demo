/* global postMessage: false */
/* global onmessage: true */

'use strict';


var React = require('react');



var routes = {
    RouteLogin:             require('../routes/RouteLogin'),
    RouteQuickaccess:       require('../routes/RouteQuickaccess'),
    RouteHome:              require('../routes/RouteHome'),
    RouteSettings:          require('../routes/RouteSettings'),
    ReactWebpackRound2App:  require('../ReactWebpackRound2App')
};


function getMessageRouteName(message){
    return message.data[0];
}


function getMessageRoutePath(message){
    return message.data[1];
}




///// START MAIN RENDERER
var Router = require('react-router');
var { Route, RouteHandler, Link } = Router;
var Routes = (
    <Route handler={routes.ReactWebpackRound2App}>
        <Route name="login" handler={routes.RouteLogin}/>
        <Route name="quickaccess" handler={routes.RouteQuickaccess}/>
        <Route name="home" path="/" handler={routes.RouteHome}/>
        <Route name="settings" handler={routes.RouteSettings}/>
    </Route>
);
function renderMain(message, path){
    Router.run(Routes, path, function (Handler) {
        var renderString = React.renderToString(<Handler/>);
        postMessage(['main', renderString]);
    });
}
///// END MAIN RENDERER





onmessage = function (message) {


    //console.log('webworker:onmessage', message);


    var routeName = getMessageRouteName(message);
    var pathName = getMessageRoutePath(message);

    if(routeName === 'main'){
        return renderMain(message, pathName);
    }

    var newRoute = new routes[routeName]({webworkerRender: true});

    var newRouteReactRender = newRoute.render();

    var newRouteHtmlRender = React.renderToString(newRouteReactRender);

    postMessage([routeName, newRouteHtmlRender]);
};





