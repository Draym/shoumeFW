'use strict';

/**
 * @ngdoc function
 * @name shoumeApp.controller:MyMomentsCtrl
 * @description
 * # MyMomentsCtrl
 * Controller of the shoumeApp
 */
angular.module('shoumeApp')
  .controller('MyMomentsCtrl', function ($scope, $uibModal, toaster, User, SubmitResult, RequestAPI, TokenManager) {

    $scope.init = function () {
      RequestAPI.GET("/user/" + User.getId() + "/moments", SubmitResult.submitSuccess(function (response) {
          $scope.myMoments = response.data;
        }),
        SubmitResult.submitFailure(), TokenManager.get());
    };

    $scope.openAddMomentModal = function() {
      var modalInstance = $uibModal.open({
        templateUrl: 'views/moments/addMomentModal.html',
        controller: 'AddMomentModalCtrl',
        size: 'lg',
        scope: $scope
      });
    };

    $scope.init();
  });
