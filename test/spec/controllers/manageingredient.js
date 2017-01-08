'use strict';

describe('Controller: ManageingredientCtrl', function () {

  // load the controller's module
  beforeEach(module('shoumeApp'));

  var ManageingredientCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ManageingredientCtrl = $controller('ManageingredientCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ManageingredientCtrl.awesomeThings.length).toBe(3);
  });
});
