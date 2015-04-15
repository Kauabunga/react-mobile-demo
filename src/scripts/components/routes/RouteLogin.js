'use strict';

var React = require('react');
var Router = require('react-router');
var { Route, RouteHandler, Link } = Router;


var dispatcher = require('../../dispatcher/ReactWebpackRound2AppDispatcher');

var FormLogin = require('../auth/FormLogin');
var FormPreviousLogin = require('../auth/FormPreviousLogin');
var AuthService = require('../auth/AuthService');

var eventRouteLoginNamespace        = 'RouteLogin';
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

    registerRenderEvents: function (payload) {
        if (payload.namespace === eventRouteLoginNamespace &&
                payload.event === 'renderresponse') {

            console.log('RouteLogin:registerRenderEvents', payload);

            //document.getElementById('route-login').innerHTML = payload.render;
            //return React.DOM.div({dangerouslySetInnerHTML: {__html: html}});

            setTimeout(() => {
                //this.setState({webworkerRenderComplete: true, webworkerRenderHtml: payload.render});
            });
        }
    },

    componentWillUnmount: function () {
        setTimeout(() => {
            dispatcher.unregister(this.dispatcherLoginRegisterToken);

            //dispatcher.unregister(this.dispatcherRenderRegisterToken);
        });
    },


    componentDidMount: function () {

        this.dispatcherLoginRegisterToken = dispatcher.register(this.registerLoginEvents);


        //this.dispatcherRenderRegisterToken = dispatcher.register(this.registerRenderEvents);
        //dispatcher.dispatch({
        //    namespace: 'RouteLogin',
        //    event: 'renderrequest'
        //});

    },

    getInitialState: function () {
        return {
            previousLogins: AuthService.getPreviousUsers()
        };
    },

    render: function () {

        var content = (<div></div>);




        //if(this.state && this.state.webworkerRenderComplete){
        //    content = ( <div dangerouslySetInnerHTML={{__html: this.state.webworkerRenderHtml}} />);
        //}
        //else if(this.props && this.props.webworkerRender){
            content = (
                <div>
                    <FormLogin
                        eventDispatcher={dispatcher}
                        eventNamespace={eventLoginNamespace}
                        eventOutboundLoginComplete={eventOutboundLoginComplete}
                        eventInboundLoginIncorrect={eventInboundLoginIncorrect}
                        eventInboundLoginCorrect={eventInboundLoginCorrect} />

                    <FormPreviousLogin
                        eventDispatcher={dispatcher}
                        eventNamespace={eventPreviousLoginNamespace}
                        eventOutboundLoginComplete={eventOutboundLoginComplete}
                        previousLogins={this.state.previousLogins} />


                </div>
            );
        //}

        return content;
    }
});

module.exports = RouteLogin;

