'use strict';

var React = require('react/addons');
var Router = require('react-router');
var { Route, RouteHandler, Link } = Router;
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;


var RouteHome = require('./routes/RouteHome');
var RouteLogin = require('./routes/RouteLogin');
var RouteQuickaccess = require('./routes/RouteQuickaccess');
var RouteSettings = require('./routes/RouteSettings');
var AuthService = require('./auth/AuthService');



//require('styles/transition.less');

require('styles/main.css');
require('styles/material.less');
require('./auth/FormQuickaccess.less');

(window !== window.top ? window.top : window).React = React;


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

        var { path: routePath, name: routeName } = this.context.router.getRouteAtDepth(this.getRouteDepth());

        var previousRouteName = this.previousRouteName || 'init';
        this.previousRouteName = routeName;

        //TODO bring back css transition handler
        return (
            <ReactCSSTransitionGroup transitionName="fade" className={'route route-to-' + routeName + ' route-from-' + previousRouteName}>
                <RouteHandler key={routePath} />
            </ReactCSSTransitionGroup>
        );

        //return (
        //    <div className={'route route-to-' + routeName + ' route-from-' + previousRouteName}>
        //
        //        <RouteHandler key={path} />
        //
        //        <div className="page page-home">
        //            <RouteHome isActive={this.context.router.isActive('home')} />
        //        </div>
        //
        //        <div className="page page-login">
        //            <RouteLogin isActive={this.context.router.isActive('login')} />
        //        </div>
        //
        //        <div className="page page-quickaccess">
        //            <RouteQuickaccess isActive={this.context.router.isActive('quickaccess')} />
        //        </div>
        //
        //        <div className="page page-settings">
        //            <RouteSettings isActive={this.context.router.isActive('settings')} />
        //        </div>
        //
        //    </div>
        //);
    }
});

module.exports = ReactWebpackRound2App;



