'use strict';

describe('Controller: MomentCtrl', function () {

  // load the controller's module
  beforeEach(module('shoumeApp'));

  var MomentCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MomentCtrl = $controller('MomentCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(MomentCtrl.awesomeThings.length).toBe(3);
  });
});
