'use strict';

/**
 * @ngdoc function
 * @name shoumeApp.controller:CreateAccountCtrl
 * @description
 * # CreateAccountCtrl
 * Controller of the shoumeApp
 */
angular.module('shoumeApp')
  .controller('CreateAccountCtrl', function ($scope, $location, toaster, User, RequestAPI, SubmitResult) {

    $scope.isBusy = false;

    $scope.register = function () {
      console.log("register", $scope.name, $scope.email, $scope.password);
      $scope.data = {
        login: $scope.email,
        password: $scope.password
      };

      // Create account
      $scope.isBusy = true;
      RequestAPI.POST("/register", $scope.data,
        SubmitResult.submitSuccess(function (response) {
          // Connexion
          RequestAPI.POST("/authenticate", $scope.data,
            SubmitResult.submitSuccess(function (response) {
              User.connect(response.data.token);
              $location.path("/");
              $scope.isBusy = false;
            }, "Connected"),
            SubmitResult.submitFailure("Connexion Failed"));
        }),
        SubmitResult.submitFailure());
    };
  });
