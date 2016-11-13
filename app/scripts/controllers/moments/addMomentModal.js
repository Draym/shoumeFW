'use strict';

/**
 * @ngdoc function
 * @name shoumeApp.controller:AddmomentmodalCtrl
 * @description
 * # AddmomentmodalCtrl
 * Controller of the shoumeApp
 */
angular.module('shoumeApp')
  .controller('AddMomentModalCtrl', function ($scope, $uibModalInstance, RequestAPI, SubmitResult, TokenManager, FileUploader) {
    $scope.flow = {};

    $scope.save = function () {
      /*
      console.log("images: ", $scope.flow);
      RequestAPI.POST("/upload", $scope.flow.content.files[0].file, SubmitResult.submitSuccess(function (response) {
          console.log("YEAH: ", response);
        }),
        SubmitResult.submitFailure(), TokenManager.get());
      */
       RequestAPI.POST("/moment", $scope.moment, SubmitResult.submitSuccess(function (response) {
       $scope.init();
       $scope.clear();
       }, "Moment created"),
       SubmitResult.submitFailure(), TokenManager.get());
    };

    $scope.uploader = new FileUploader();

    $scope.checkImg = function() {
      console.log("draw: ", $scope.img);
    };

    $scope.clear = function () {
      $uibModalInstance.dismiss('cancel');
    };
  });
