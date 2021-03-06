'use strict';

/**
 * @ngdoc function
 * @name shoumeApp.controller:MomentCtrl
 * @description
 * # MomentCtrl
 * Controller of the shoumeApp
 */
angular.module('shoumeApp')
  .controller('MomentCtrl', function ($scope, $routeParams, RequestAPI, SubmitResult, User, History) {
    $scope.id = $routeParams.id;
    $scope.comment = {};

    $scope.init = function () {
      RequestAPI.GET("/moment/" + $scope.id, SubmitResult.submitSuccess(function (response) {
          $scope.moment = response.data;
          try {
            $scope.moment.images = JSON.parse($scope.moment.image_url);
          } catch (e) {
            $scope.moment.images = [];
          }
          History.addMoment($scope.moment);
          RequestAPI.GET("/moment/" + $scope.moment.id + "/comments", SubmitResult.submitSuccess(function (response) {
              $scope.comments = response.data;
            }),
            SubmitResult.submitFailure(), User.getToken());
        }),
        SubmitResult.submitFailure(), User.getToken());
    };

    $scope.closeReply = function () {
      $scope.isReplyingToMoment = false;
    };

    $scope.replyToPeople = function () {

    };

    $scope.replyToMoment = function () {
      $scope.isReplyingToMoment = true;
    };

    $scope.sendReply = function () {
      if ($scope.comment.content) {
        RequestAPI.GET("/user", SubmitResult.submitSuccess(function (response) {
            $scope.comment.thumbnail = response.data.thumbnail;
            RequestAPI.POST("/moment/" + $scope.moment.id + "/comment", $scope.comment, SubmitResult.submitSuccess(function (response) {
                $scope.comment.content = "";
                RequestAPI.GET("/moment/" + $scope.moment.id + "/comments", SubmitResult.submitSuccess(function (response) {
                    $scope.comments = response.data;
                  }, "comment send"),
                  SubmitResult.submitFailure(), User.getToken());
              }),
              SubmitResult.submitFailure(), User.getToken());
          }),
          SubmitResult.submitFailure(), User.getToken());
      }
    };

    $scope.init();
  });
