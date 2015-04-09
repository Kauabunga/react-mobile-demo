'use strict';

var React = require('react/addons');
var Dispatcher = require('flux').Dispatcher;
var { TextField, RaisedButton } = require('material-ui');


/**
 *
 * @type {*|Function}
 */
var FormLogin = React.createClass({

    propTypes: {
        eventDispatcher: React.PropTypes.instanceOf(Dispatcher).isRequired,
        eventNamespace: React.PropTypes.string.isRequired,
        eventOutboundLoginComplete: React.PropTypes.string.isRequired,
        eventInboundLoginIncorrect: React.PropTypes.string.isRequired,
        eventInboundLoginCorrect: React.PropTypes.string.isRequired
    },

    getInitialState: function(){
        return {
            email: '',
            errorText: ''
        };
    },

    getLoginCompleteEvent: function(email){
        return {
            namespace: this.props.eventNamespace,
            event: this.props.eventOutboundLoginComplete,
            email: email
        };
    },

    login: function(event){
        setTimeout(() => {
            if(this.state.email){
                this.props.eventDispatcher.dispatch(this.getLoginCompleteEvent(this.state.email));
            }
            else {
                this.setState({errorText: 'Need your email address'});
            }
        });
    },

    emailChange: function(event){
        this.setState({email: event.target.value});
    },

    shouldComponentUpdate: function(){
        return true;
    },


    render: function () {
        return (
            <form onSubmit={this.login} noValidate={true}>
                <TextField
                    onChange={this.emailChange}
                    type="email"
                    errorText={this.state.errorText}
                    floatingLabelText="Enter your email" />

                <RaisedButton type="submit" onClick={this.login} label="Login" />
            </form>
        );
    }
});

module.exports = FormLogin;

