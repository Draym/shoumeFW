'use strict';

/**
 * @ngdoc function
 * @name shoumeApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the shoumeApp
 */
angular.module('shoumeApp')
  .config(['$routeProvider', '$httpProvider', function($routeProvider, $httpProvider) {
    $httpProvider.defaults.headers.common = {};
    $httpProvider.defaults.headers.post = {};
    $httpProvider.defaults.headers.put = {};
    $httpProvider.defaults.headers.patch = {};
  }])
  .controller('LoginCtrl', function ($scope, $location, $http) {
    $scope.login = function () {
      console.log("login: ", $scope.email, $scope.password);
      var data = JSON.stringify({
        name: $scope.email,
        password: $scope.password
      });
      submitRequest(data);
    };

    var submitRequest = function (data) {
      $http({
        method: 'POST',
        url: 'https://shoume-keysim.c9users.io:8080/api/authenticate',
        data: data,
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(
        function (response) {
          // success callback
          $scope.response = response.data;
        },
        function (response) {
          // failure callback
          $scope.response = response.statusText;
        }
      );
    }
  });
