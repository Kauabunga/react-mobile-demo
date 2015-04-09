'use strict';

var React = require('react');
var Router = require('react-router');
var { Route, RouteHandler, Link, Navigation } = Router;



var AuthService = require('../auth/AuthService');
var FormQuickaccess = require('../auth/FormQuickaccess');
var dispatcher = require('../../dispatcher/ReactWebpackRound2AppDispatcher');



var eventNamespace              = 'FormQuickaccess';
var eventOutboundPinComplete    = 'pinComplete';
var eventOutboundPinForgot      = 'pinForgot';
var eventInboundPinIncorrect    = 'pinIncorrect';
var eventInboundPinCorrect      = 'pinCorrect';
var eventInboundPinReset      = 'pinReset';



var RouteQuickaccess = React.createClass({

    contextTypes: {
        router: React.PropTypes.func
    },

    getInitialState: function(){
        return {
            username: AuthService.getQuickaccessUser()
        };
    },

    registerPinEvents: function(payload){
        if(payload.namespace === eventNamespace){
            switch(payload.event){
                case eventOutboundPinComplete:
                    this.pinComplete(payload.pin);
                    break;
                case eventOutboundPinForgot:

                    break;
            }
        }

    },

    componentWillUnmount: function(){
        setTimeout(() => {
            dispatcher.unregister(this.eventRegisterToken);
        }, 500);
    },

    componentDidMount: function(){
        setTimeout(() => {
            this.eventRegisterToken = dispatcher.register(this.registerPinEvents);
        }, 500);

    },

    componentWillReceiveProps: function(nextProps){
        if(this.props.isActive === false && nextProps.isActive){
            console.log('Reinitialising route', nextProps);
            this.setState(this.getInitialState());
            dispatcher.dispatch({
                namespace: eventNamespace,
                event: eventInboundPinReset
            });
        }
    },

    componentWillMount: function(){
        if( ! this.state.username){
            //TODO need to wait for transition to complete?
            setTimeout(() => {
                this.context.router.replaceWith('login');
            });
        }
    },

    pinIncorrect: function(){
        console.log('RouteQuickaccess:pinIncorrect');
        setTimeout(() => {
            dispatcher.dispatch({
                namespace: eventNamespace,
                event: eventInboundPinIncorrect
            });
        });
    },

    pinCorrect: function (){
        console.log('RouteQuickaccess:pinCorrect');

        setTimeout(() => {
            dispatcher.dispatch({
                namespace: eventNamespace,
                event: eventInboundPinCorrect
            });

            setTimeout(() => this.context.router.replaceWith('home'), 50);
        });

    },



    pinComplete: function(pin){
        AuthService.loginPin(this.state.username, pin).then(
            () => {
                this.pinCorrect();
            },
            () => {
                this.pinIncorrect();
            }
        );
    },


    render: function () {
        return (
            <FormQuickaccess
                eventDispatcher={dispatcher}
                eventNamespace={eventNamespace}
                eventOutboundPinComplete={eventOutboundPinComplete}
                eventOutboundPinForgot={eventOutboundPinForgot}
                eventInboundPinIncorrect={eventInboundPinIncorrect}
                eventInboundPinCorrect={eventInboundPinCorrect}
                eventInboundPinReset={eventInboundPinReset} />
        );
    }
});

module.exports = RouteQuickaccess;



