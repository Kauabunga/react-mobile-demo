'use strict';

var React = require('react/addons');
var Router = require('react-router');
var { Route, RouteHandler, Link } = Router;
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;


var AuthService = require('./auth/AuthService');


var RouteLogin = require('./routes/RouteLogin');
var RouteQuickaccess = require('./routes/RouteQuickaccess');
var RouteHome = require('./routes/RouteHome');
var RouteSettings = require('./routes/RouteSettings');



if(typeof window !== 'undefined'){
    (window !== window.top ? window.top : window).React = React;
}



var ReactWebpackRound2App = React.createClass({

    contextTypes: {
        routeDepth: React.PropTypes.number.isRequired,
        router: React.PropTypes.func
    },

    componentWillMount: function(){

        //check authentication state - if not logged in redirect to /login
        if(AuthService.isLoggedIn()){

        }
        else {

        }

        //TODO also need to perform an async login check every route change

    },

    getInitialState: function(){
        return {};
    },


    getRouteDepth: function getRouteDepth() {
        return this.context.routeDepth;
    },


    render: function() {

        //re rendered on route change

        var { path: routePath, name: routeName } = this.context.router.getRouteAtDepth(this.getRouteDepth());

        var previousRouteName = this.previousRouteName || 'init';
        this.previousRouteName = routeName;


        //return (
        //    <ReactCSSTransitionGroup transitionName="fade" id={'route-' + routeName} className={'route route-to-' + routeName + ' route-from-' + previousRouteName}>
        //        <RouteHandler key={routeName} />
        //    </ReactCSSTransitionGroup>
        //);

        //return (
        //    <div id={'route-' + routeName} className={'route route-to-' + routeName + ' route-from-' + previousRouteName}>
        //        <div className="page page-home">
        //            <RouteHome />
        //        </div>
        //        <div className="page page-login">
        //            <RouteLogin />
        //        </div>
        //        <div className="page page-quickaccess">
        //            <RouteQuickaccess />
        //        </div>
        //    </div>
        //);

        return (
            <div id={'route-' + routeName} className={'route route-to-' + routeName + ' route-from-' + previousRouteName}>
                <RouteHandler key={routeName} />
            </div>
        );

    }
});

module.exports = ReactWebpackRound2App;



