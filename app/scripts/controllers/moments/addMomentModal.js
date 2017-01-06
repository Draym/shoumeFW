'use strict';

/**
 * @ngdoc function
 * @name shoumeApp.controller:AddMomentModalCtrl
 * @description
 * # AddMomentModalCtrl
 * Controller of the shoumeApp
 */
angular.module('shoumeApp')
  .controller('AddMomentModalCtrl', function ($scope, $uibModalInstance, RequestAPI, SubmitResult, User) {
    $scope.isBusy = false;
    $scope.images = [];
    $scope.currentImage = "";

    /*** FUNCTION ***/
    $scope.addImage = function () {
      if ($scope.images.length < 4) {
        $scope.images.push($scope.currentImage);
      }
      $scope.currentImage = "";
    };

    $scope.removeImage = function (id) {
      for (var i = 0; i < $scope.images.length; ++i) {
        if ($scope.images[i] == id) {
          $scope.images.splice(i, 1);
          --i;
          break;
        }
      }
    };

    $scope.save = function () {
      $scope.isBusy = true;
      $scope.moment.image_url = JSON.stringify($scope.images);

      RequestAPI.POST("/moment", $scope.moment, SubmitResult.submitSuccess(function (response) {
          $scope.init();
          $scope.clear();
          $scope.isBusy = false;
        }, "Moment created"),
        SubmitResult.submitFailure(function () {
          $scope.isBusy = false;
        }), User.getToken());
    };

    $scope.clear = function () {
      $uibModalInstance.dismiss('cancel');
    };
  })
;
