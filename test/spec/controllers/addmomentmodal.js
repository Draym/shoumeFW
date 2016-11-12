'use strict';

describe('Controller: AddmomentmodalCtrl', function () {

  // load the controller's module
  beforeEach(module('shoumeApp'));

  var AddmomentmodalCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AddmomentmodalCtrl = $controller('AddmomentmodalCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(AddmomentmodalCtrl.awesomeThings.length).toBe(3);
  });
});
