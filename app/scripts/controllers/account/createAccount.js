'use strict';

/**
 * @ngdoc function
 * @name shoumeApp.controller:CreateAccountCtrl
 * @description
 * # CreateAccountCtrl
 * Controller of the shoumeApp
 */
angular.module('shoumeApp')
  .controller('CreateAccountCtrl', function ($scope, $location, toaster, User, RequestAPI) {
    $scope.status = false;
    $scope.token = "?";

    $scope.register = function () {
      console.log("register", $scope.name, $scope.email, $scope.password);
      $scope.data = {
        login: $scope.email,
        password: $scope.password
      };
      RequestAPI.POST("/register", $scope.data, submitSuccess, submitFailure);;
    };

    var submitSuccess = function(response) {
      $scope.status = true;
      console.log(response);
      RequestAPI.POST("/authenticate",$scope.data, function(response) {
        toaster.success({'body': "Connected"});
        console.log(response);
        User.connect(response.data.token);
        $location.path("/");
      }, submitFailure);
    };

    var submitFailure = function(response) {
      toaster.error({'body': response.data.message});
      $scope.status = false;
    };
  });
