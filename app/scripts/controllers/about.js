'use strict';

/**
 * @ngdoc function
 * @name shoumeApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the shoumeApp
 */
angular.module('shoumeApp')
  .controller('AboutCtrl', function ($scope, $cookies) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $scope.removeCookies = function () {
      $cookies.remove("userConnected");
      $cookies.remove("token")
    };
  });
