'use strict';

/**
 * @ngdoc function
 * @name shoumeApp.controller:AddmomentmodalCtrl
 * @description
 * # AddmomentmodalCtrl
 * Controller of the shoumeApp
 */
angular.module('shoumeApp')
  .controller('AddMomentModalCtrl', function ($scope, $uibModalInstance, RequestAPI, SubmitResult, TokenManager) {

    $scope.save = function () {
      RequestAPI.POST("/moment", $scope.moment, SubmitResult.submitSuccess(function (response) {
          $scope.init();
          $scope.clear();
        }, "Moment created"),
        SubmitResult.submitFailure(), TokenManager.get());
    };

    $scope.clear = function () {
      $uibModalInstance.dismiss('cancel');
    };
  });
