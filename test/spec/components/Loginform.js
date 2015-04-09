'use strict';

describe('Loginform', function () {
  var React = require('react/addons');
  var Loginform, component;

  beforeEach(function () {
    Loginform = require('components/Loginform.js');
    component = React.createElement(Loginform);
  });

  it('should create a new instance of Loginform', function () {
    expect(component).toBeDefined();
  });
});
