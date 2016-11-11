'use strict';

/**
 * @ngdoc function
 * @name shoumeApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the shoumeApp
 */
angular.module('shoumeApp')
  .controller('LoginCtrl', function ($scope, $location, toastr, RequestAPI, User) {

    $scope.userCtrl = User;
    $scope.data = {};

    $scope.loginPageLocation = function() {
        return $location.path() == "/login";
    };

    $scope.login = function () {
      console.log("login: ", $scope.data.email, $scope.data.password);
      RequestAPI.POST("/authenticate", $scope.data, submitSuccess, submitFailure);
    };

    var submitSuccess = function (response) {
      $scope.status = true;
      console.log(response);
      toastr.success({'body': "Connected"});
      User.connect(response.data.token);
      $location.path("/")
    };

    var submitFailure = function (response) {
      if (response.data != null) {
        toastr.error({'body': response.data.message});
      } else {
        toastr.error({'body': "connexion failled"});
      }
      $scope.status = false;
    };
  });
