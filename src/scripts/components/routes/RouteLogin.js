'use strict';

var React = require('react');
var Router = require('react-router');
var { Route, RouteHandler, Link } = Router;


var dispatcher = require('../../dispatcher/ReactWebpackRound2AppDispatcher');

var FormLogin = require('../auth/FormLogin');
var FormPreviousLogin = require('../auth/FormPreviousLogin');
var AuthService = require('../auth/AuthService');


var eventPreviousLoginNamespace     = 'FormPreviousLogin';
var eventLoginNamespace             = 'FormLogin';
var eventOutboundLoginComplete      = 'loginComplete';
var eventInboundLoginCorrect        = 'loginCorrect';
var eventInboundLoginIncorrect      = 'loginIncorrect';


/**
 *
 * @type {*|Function}
 */
var RouteLogin = React.createClass({

    contextTypes: {
        router: React.PropTypes.func
    },

    loginComplete: function (email) {
        AuthService.setQuickaccessUser(email).then(() => {
            setTimeout(() => {
                this.context.router.transitionTo('quickaccess');
            });
        });
    },

    registerLoginEvents: function (payload) {

        if (payload.namespace === eventLoginNamespace ||
            payload.namespace === eventPreviousLoginNamespace) {

            switch (payload.event) {
                case eventOutboundLoginComplete:
                    this.loginComplete(payload.email);
                    break;
            }
        }
    },

    componentWillReceiveProps: function(nextProps){
        if(this.props.isActive === false && nextProps.isActive){
            console.log('Reinitialising route', nextProps);
            this.setState(this.getInitialState());
        }
    },

    componentWillUnmount: function () {
        setTimeout(() => {
            dispatcher.unregister(this.dispatcherRegisterToken);
        }, 500);
    },


    componentDidMount: function () {
        setTimeout(() => {
            this.dispatcherRegisterToken = dispatcher.register(this.registerLoginEvents);
        }, 500);
    },

    getInitialState: function () {
        return {
            previousLogins: AuthService.getPreviousUsers()
        };
    },

    render: function () {

        return (
            <div>
                <FormLogin
                    eventDispatcher={dispatcher}
                    eventNamespace={eventLoginNamespace}
                    eventOutboundLoginComplete={eventOutboundLoginComplete}
                    eventInboundLoginIncorrect={eventInboundLoginIncorrect}
                    eventInboundLoginCorrect={eventInboundLoginCorrect}
                />
                <FormPreviousLogin
                    eventDispatcher={dispatcher}
                    eventNamespace={eventPreviousLoginNamespace}
                    eventOutboundLoginComplete={eventOutboundLoginComplete}

                    previousLogins={this.state.previousLogins}
                />

            </div>
        );
    }
});

module.exports = RouteLogin;

