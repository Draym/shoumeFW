'use strict';

/**
 * @ngdoc directive
 * @name shoumeApp.directive:accountNavbarWidget
 * @description
 * # accountNavbarWidget
 */
angular.module('shoumeApp')
  .directive('accountNavbarWidget', function () {
    return {
      restrict: 'A',
      templateUrl: "views/accountNavbarWidget.html",
      controller: "AccountNavbarWidgetCtrl"
    }
  })
  .controller('AccountNavbarWidgetCtrl', function ($scope, $location, User) {

    $scope.userCtrl = User;
  console.log("HI");
    $scope.myAccount = function() {
      $location.path("/myAccount");
    };

    $scope.disconnect = function() {
      $scope.userCtrl.disconnect();
    }
  });
