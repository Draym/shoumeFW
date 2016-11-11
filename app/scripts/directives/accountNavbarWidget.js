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
      templateUrl: "views/account/accountNavbarWidget.html",
      controller: "AccountNavbarWidgetCtrl"
    }
  })
  .controller('AccountNavbarWidgetCtrl', function ($scope, $location, User) {

    $scope.userCtrl = User;
  console.log("HI");
    $scope.myAccount = function() {
      $location.path("/myAccount");
    };

    $scope.myMoments = function() {
      $location.path("/myMoments");
    };

    $scope.disconnect = function() {
      $scope.userCtrl.disconnect();
    }
  });
