'use strict';

/**
 * @ngdoc function
 * @name shoumeApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the shoumeApp
 */
angular.module('shoumeApp')
  .controller('LoginCtrl', function ($scope, $location, toaster, RequestAPI, User, SubmitResult) {

    $scope.userCtrl = User;
    $scope.data = {};
    $scope.isBusy = false;

    $scope.loginPageLocation = function () {
      return $location.path() == "/login";
    };

    $scope.doLogin = function () {
      console.log("login: ", $scope.data.login, $scope.data.password);
      $scope.isBusy = true;
      RequestAPI.POST("/authenticate", $scope.data,
        SubmitResult.submitSuccess(function (response) {
          User.connect(response.data.token, response.data.id);
          $location.path("/");
          $scope.isBusy = false;
        }, "Connected"),
        SubmitResult.submitFailure(function() {
          $scope.isBusy = false;
        }, "Connexion Failed"));
    };
  });
