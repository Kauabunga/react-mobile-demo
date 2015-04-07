'use strict';

describe('Quickaccess', function () {
  var React = require('react/addons');
  var Quickaccess, component;

  beforeEach(function () {
    Quickaccess = require('components/Quickaccess.js');
    component = React.createElement(Quickaccess);
  });

  it('should create a new instance of Quickaccess', function () {
    expect(component).toBeDefined();
  });
});
