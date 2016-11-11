'use strict';

describe('Controller: AllrecipesCtrl', function () {

  // load the controller's module
  beforeEach(module('shoumeApp'));

  var AllrecipesCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AllrecipesCtrl = $controller('AllrecipesCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(AllrecipesCtrl.awesomeThings.length).toBe(3);
  });
});
