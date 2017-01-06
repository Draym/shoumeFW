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
    $scope.myAccount = function() {
      $location.path("/myAccount");
    };

    $scope.myMoments = function() {
      $location.path("/myMoments");
    };

    $scope.myRecipes = function() {
      $location.path("/myRecipes");
    };

    $scope.disconnect = function() {
      $scope.userCtrl.disconnect();
    }
  });
