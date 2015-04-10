'use strict';


var React = require('react');
var RouteLogin = require('../routes/RouteLogin');

onmessage = function(event) {

    console.log(RouteLogin);

    var newLogin = new RouteLogin();

    var newLoginRender = newLogin.render();

    var render = React.renderToString(newLoginRender);

    console.log(render);

    postMessage(['moooo']);

};




