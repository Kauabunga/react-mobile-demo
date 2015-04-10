'use strict';


var React = require('react');

var routes = {
    RouteLogin: require('../routes/RouteLogin'),
    RouteQuickaccess: require('../routes/RouteQuickaccess'),
    RouteHome: require('../routes/RouteHome'),
    RouteSettings: require('../routes/RouteSettings')
};

onmessage = function (message) {
    console.log('message', message.data[0]);

    var newRoute = new routes[message.data[0]]();
    var newRouteReactRender = newRoute.render();
    var newRouteHtmlRender = React.renderToString(newRouteReactRender);

    postMessage([newRouteHtmlRender]);
};




