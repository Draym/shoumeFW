'use strict';

describe('Controller: ListMomentsCtrl', function () {

  // load the controller's module
  beforeEach(module('shoumeApp'));

  var ListMomentsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ListMomentsCtrl = $controller('ListmomentsCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ListMomentsCtrl.awesomeThings.length).toBe(3);
  });
});
