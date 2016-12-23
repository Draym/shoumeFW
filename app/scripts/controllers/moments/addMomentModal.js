'use strict';

/**
 * @ngdoc function
 * @name shoumeApp.controller:AddMomentModalCtrl
 * @description
 * # AddMomentModalCtrl
 * Controller of the shoumeApp
 */
angular.module('shoumeApp')
  .controller('AddMomentModalCtrl', function ($scope, $uibModalInstance, RequestAPI, SubmitResult, User, FileUploader) {
    $scope.flow = {};
    $scope.isBusy = false;

    $scope.save = function () {
      $scope.isBusy = true;
      /*
       console.log("images: ", $scope.flow);
       RequestAPI.POST("/upload", $scope.flow.content.files[0].file, SubmitResult.submitSuccess(function (response) {
       console.log("YEAH: ", response);
       }),
       SubmitResult.submitFailure(), User.getToken());
       */
      RequestAPI.POST("/moment", $scope.moment, SubmitResult.submitSuccess(function (response) {
          $scope.init();
          $scope.clear();
          $scope.isBusy = false;
        }, "Moment created"),
        SubmitResult.submitFailure(), User.getToken());
    };

    $scope.uploader = new FileUploader();

    $scope.checkImg = function () {
      console.log("draw: ", $scope.img);
    };

    $scope.clear = function () {
      $uibModalInstance.dismiss('cancel');
    };
  });
