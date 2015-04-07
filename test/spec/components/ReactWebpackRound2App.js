'use strict';

describe('Main', function () {
  var React = require('react/addons');
  var ReactWebpackRound2App, component;

  beforeEach(function () {
    var container = document.createElement('div');
    container.id = 'content';
    document.body.appendChild(container);

    ReactWebpackRound2App = require('components/ReactWebpackRound2App.js');
    component = React.createElement(ReactWebpackRound2App);
  });

  it('should create a new instance of ReactWebpackRound2App', function () {
    expect(component).toBeDefined();
  });
});
