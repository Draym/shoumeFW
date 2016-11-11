'use strict';

describe('Controller: MymomentsCtrl', function () {

  // load the controller's module
  beforeEach(module('shoumeApp'));

  var MymomentsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MymomentsCtrl = $controller('MymomentsCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(MymomentsCtrl.awesomeThings.length).toBe(3);
  });
});
