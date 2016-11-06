'use strict';

/**
 * @ngdoc function
 * @name shoumeApp.controller:CreateAccountCtrl
 * @description
 * # CreateAccountCtrl
 * Controller of the shoumeApp
 */
angular.module('shoumeApp')
  .config(['$routeProvider', '$httpProvider', function($routeProvider, $httpProvider) {
    $httpProvider.defaults.headers.common = {};
    $httpProvider.defaults.headers.post = {};
    $httpProvider.defaults.headers.put = {};
    $httpProvider.defaults.headers.patch = {};
  }])
  .controller('CreateAccountCtrl', function ($scope, toastr, $http) {
    $scope.status = false;
    $scope.token = "?";

    $scope.register = function () {
      console.log("register", $scope.name, $scope.email, $scope.password);
      var data = JSON.stringify({
        name: $scope.email,
        password: $scope.password
      });
      submitRequest(data);
    };

    var submitRequest = function (data) {

      $http({
        method: 'POST',
        url: 'https://shoume-keysim.c9users.io:8080/api/register',
        data: data,
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(
        function (response) {
          // success callback

          toastr.success({'body': "success"});
          $scope.response = response.data;
          $scope.status = true;
        },
        function (response) {
          // failure callback
          swal({
            title: "Error!",
            text: "Here's my error message!",
            type: "error",
            confirmButtonText: "Cool"
          });
          $scope.response = response.statusText;
          $scope.status = false;
        }
      );
    }
  });
