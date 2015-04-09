'use strict';

var React = require('react/addons');
var Dispatcher = require('flux').Dispatcher;
var { TextField, RaisedButton } = require('material-ui');


var FormPreviousLogin = React.createClass({

    propTypes: {
        eventDispatcher: React.PropTypes.instanceOf(Dispatcher).isRequired,
        eventNamespace: React.PropTypes.string.isRequired,
        eventOutboundLoginComplete: React.PropTypes.string.isRequired,

        previousLogins: React.PropTypes.array.isRequired
    },

    getInitialState: function(){
        return {};
    },

    getLoginCompleteEvent: function(email){
        return {
            namespace: this.props.eventNamespace,
            event: this.props.eventOutboundLoginComplete,
            email: email
        };
    },

    login: function(email){
        setTimeout(() => {
            this.props.eventDispatcher.dispatch(this.getLoginCompleteEvent(email));
        });
    },

    shouldComponentUpdate: function(){
        return true;
    },


    render: function () {

        var logins = [];
        for (var i=0; i < this.props.previousLogins.length; i++) {
            logins.push(

                <RaisedButton onClick={this.login.bind(this, this.props.previousLogins[i])}
                    key={this.props.previousLogins[i]} label={this.props.previousLogins[i]} />

            );
        }

        return (
            <div>
                {logins}
            </div>
        );
    }
});

module.exports = FormPreviousLogin;

