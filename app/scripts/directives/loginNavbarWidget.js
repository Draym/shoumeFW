'use strict';

/**
 * @ngdoc directive
 * @name shoumeApp.directive:loginNavbarWidget
 * @description
 * # loginNavbarWidget
 */
angular.module('shoumeApp')
  .directive('loginNavbarWidget', function () {
    return {
      restrict: 'A',
      templateUrl: "views/loginNavbarWidget.html",
      controller: "LoginCtrl"
    }
  });
