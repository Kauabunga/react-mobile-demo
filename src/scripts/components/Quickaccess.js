'use strict';

var React = require('react');
var Router = require('react-router');
var { Route, RouteHandler, Link } = Router;


var mui = require('material-ui');
var RaisedButton = mui.RaisedButton;


require('styles/Quickaccess.less');

var Quickaccess = React.createClass({



  render: function () {
      var email= 'moooo';
    return (
        <div className="pincontainer">

            <div className="row pintitle">
                <RaisedButton>{email}</RaisedButton>
            </div>

            <div className="row pindisplay">
                <span className="pindisplay-circle">
                    <span className="pindisplay-outter"></span>
                    <span className="pindisplay-inner"></span>
                </span>
                <span className="pindisplay-circle">
                    <span className="pindisplay-outter"></span>
                    <span className="pindisplay-inner"></span>
                </span>
                <span className="pindisplay-circle">
                    <span className="pindisplay-outter"></span>
                    <span className="pindisplay-inner"></span>
                </span>
                <span className="pindisplay-circle">
                    <span className="pindisplay-outter"></span>
                    <span className="pindisplay-inner"></span>
                </span>
            </div>

            <div className="row pininput-container">
                <div className="pininput">

                    <button className="pindigit">1</button>
                    <button className="pindigit">2</button>
                    <button className="pindigit">3</button>
                    <button className="pindigit">4</button>
                    <button className="pindigit">5</button>
                    <button className="pindigit">6</button>
                    <button className="pindigit">7</button>
                    <button className="pindigit">8</button>
                    <button className="pindigit">9</button>

                    <button className="pinforgot">Forgot pin</button>

                    <button className="pindigit">0</button>

                    <button className="pinclear" >Clear</button>

                </div>
            </div>

        </div>

      );
  }
});

module.exports = Quickaccess;

