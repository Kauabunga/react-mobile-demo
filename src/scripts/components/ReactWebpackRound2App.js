'use strict';

var React = require('react/addons');
var TransitionGroup = require('react/lib/ReactCSSTransitionGroup');
var Router = require('react-router');
var { Route, RouteHandler, Link } = Router;

// CSS
require('normalize.css');
require('../../styles/main.css');


(window !== window.top ? window.top : window).React = React;


var ReactWebpackRound2App = React.createClass({

    contextTypes: {
        router: React.PropTypes.func
    },

  render: function() {
      var name = this.context.router.getCurrentPath();

      return (
        <TransitionGroup component="div" className="main" transitionName="fade">
            <RouteHandler key={name}/>
        </TransitionGroup>
    );
  }
});

module.exports = ReactWebpackRound2App;



