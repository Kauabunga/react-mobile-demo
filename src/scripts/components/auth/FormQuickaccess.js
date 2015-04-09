'use strict';

var React = require('react/addons');
var Dispatcher = require('flux').Dispatcher;
var { FlatButton } = require('material-ui');


require('./FormQuickaccess.less');


/**
 *
 * @type {*|Function}
 */
var QuickaccessInputClear = React.createClass({
    render: function(){
        return (
            <FlatButton className="pindigit" label="Clear" />
        );
    }
});

/**
 *
 * @type {*|Function}
 */
var QuickaccessInputForgot = React.createClass({
    render: function(){
        return (
            <FlatButton className="pindigit" label="Forgot Pin" />
        );
    }
});


/**
 *
 * @type {*|Function}
 */
var QuickaccessInputPin = React.createClass({
    propTypes: {
        digit: React.PropTypes.string.isRequired,
        onPinClick: React.PropTypes.func.isRequired
    },
    handleClick: function(event) {
        console.log('QuickaccessInputPin:handleClick', event);
        this.props.onPinClick(this.props.digit);
    },
    render: function(){
        return (
            <FlatButton onClick={this.handleClick} className="pindigit" label={this.props.digit} />
        );
    }
});


/**
 *
 * @type {*|Function}
 */
var QuickaccessInput = React.createClass({
    render: function(){
        return (
            <div className="row pininput-container">
                <div className="pininput">

                    <QuickaccessInputPin onPinClick={this.props.onPinClick} digit="1"></QuickaccessInputPin>
                    <QuickaccessInputPin onPinClick={this.props.onPinClick} digit="2"></QuickaccessInputPin>
                    <QuickaccessInputPin onPinClick={this.props.onPinClick} digit="3"></QuickaccessInputPin>
                    <QuickaccessInputPin onPinClick={this.props.onPinClick} digit="4"></QuickaccessInputPin>
                    <QuickaccessInputPin onPinClick={this.props.onPinClick} digit="5"></QuickaccessInputPin>
                    <QuickaccessInputPin onPinClick={this.props.onPinClick} digit="6"></QuickaccessInputPin>
                    <QuickaccessInputPin onPinClick={this.props.onPinClick} digit="7"></QuickaccessInputPin>
                    <QuickaccessInputPin onPinClick={this.props.onPinClick} digit="8"></QuickaccessInputPin>
                    <QuickaccessInputPin onPinClick={this.props.onPinClick} digit="9"></QuickaccessInputPin>

                    <QuickaccessInputForgot></QuickaccessInputForgot>

                    <QuickaccessInputPin onPinClick={this.props.onPinClick} digit="0"></QuickaccessInputPin>

                    <QuickaccessInputClear></QuickaccessInputClear>
                </div>
            </div>
        );
    }
});

/**
 *
 * @type {*|Function}
 */
var QuickaccessDisplay = React.createClass({

    /**
     *
     * @param nextProps
     */
    componentWillReceiveProps: function(nextProps){
        console.log('QuickaccessDisplay : componentWillReceiveProps', nextProps);
    },

    /**
     *
     * @param nextProps
     * @param nextState
     * @returns {boolean}
     */
    shouldComponentUpdate: function(nextProps, nextState){
        console.log('QuickaccessDisplay : shouldComponentUpdate', nextProps, nextState);
        return true;
    },

    render: function(){

        var pinDisplayClass = 'pindisplay';
        if(this.props.pinCorrect){
            pinDisplayClass = pinDisplayClass + ' success';
        }
        if(this.props.pinIncorrect){
            pinDisplayClass = pinDisplayClass + ' error';
        }

        var pins = [];
        for (var i=0; i < this.props.pinDigits; i++) {

            var pinClass = this.props.pinEntry.length <= i ? 'pindisplay-circle' : 'pindisplay-circle pindisplay-circle-full';

            pins.push(
                <span key={i} className={pinClass}>
                    <span className="pindisplay-outter"></span>
                    <span className="pindisplay-inner"></span>
                </span>
            );
        }

        return (
            <div className={pinDisplayClass}>
                {pins}
            </div>
        );
    }

});

/**
 *
 * @type {*|Function}
 */
var FormQuickaccess = React.createClass({

    propTypes: {
        eventDispatcher: React.PropTypes.instanceOf(Dispatcher).isRequired,
        eventNamespace: React.PropTypes.string.isRequired,
        eventOutboundPinComplete: React.PropTypes.string.isRequired,
        eventOutboundPinForgot: React.PropTypes.string.isRequired,
        eventInboundPinIncorrect: React.PropTypes.string.isRequired,
        eventInboundPinCorrect: React.PropTypes.string.isRequired,
        eventInboundPinReset: React.PropTypes.string.isRequired,

        pinDigits: React.PropTypes.number,
        forgotEnabled: React.PropTypes.bool,
        clearEnabled: React.PropTypes.bool
    },

    getPinCompleteEvent: function(pin){
        return {
            namespace: this.props.eventNamespace,
            event: this.props.eventOutboundPinComplete,
            pin: pin
        };
    },

    shouldComponentUpdate: function(nextProps, nextState){
        console.log('FormQuickaccess : shouldComponentUpdate', nextProps, nextState);

        //fire named event to let controller know that the pin is complete
        if(nextState.pinEntry.length === nextProps.pinDigits && nextState.pinEntry !== this.state.pinEntry){

            console.log('EVENT --- ', this.props.eventOutboundPinComplete);

            setTimeout(() => {
                this.props.eventDispatcher.dispatch(this.getPinCompleteEvent(nextState.pinEntry));
            });
        }

        return true;
    },

    dispatcherHandle: function(payload){

        if(payload.namespace === this.props.eventNamespace){
            switch(payload.event){
                case this.props.eventInboundPinCorrect:

                    this.setState({pinCorrect: true});

                    break;
                case this.props.eventInboundPinReset:
                    this.setState(this.getInitialState());

                    break;
                case this.props.eventInboundPinIncorrect:

                    this.setState({pinIncorrect: true});

                    setTimeout(() =>{
                        if(this.state.pinIncorrect === true){
                            this.setState({pinIncorrect: false, pinEntry: ''});
                        }
                    }, 500);

                    break;

            }
        }

    },

    componentWillUnmount: function(){
        this.props.eventDispatcher.unregister(this.dispatcherRegisterToken);
    },

    componentDidMount: function(){
        //can delay this for animation speed
        setTimeout(() => {
            this.dispatcherRegisterToken = this.props.eventDispatcher.register(this.dispatcherHandle);
        }, 500);
    },


    getInitialState: function(){
        return {
            pinEntry: '',
            pinIncorrect: false,
            pinCorrect: false
        };
    },


    getDefaultProps: function(){
        return {
            pinDigits: 4,
            forgotEnabled: true,
            clearEnabled: true
        };
    },

    render: function () {
        return (
            <div>
                <QuickaccessDisplay pinEntry={this.state.pinEntry}
                    pinCorrect={this.state.pinCorrect}
                    pinIncorrect={this.state.pinIncorrect}
                    pinDigits={this.props.pinDigits}>
                </QuickaccessDisplay>

                <QuickaccessInput onPinClick={this.addPinDigit}></QuickaccessInput>
            </div>
        );
    },


    addPinDigit: function(digit){

        console.log('FormQuickaccess:addPinDigit', digit);

        if(this.state.pinEntry.length < 4){
            this.setState({ pinEntry: this.state.pinEntry.concat(digit) });
        }

    }


});

module.exports = FormQuickaccess;

