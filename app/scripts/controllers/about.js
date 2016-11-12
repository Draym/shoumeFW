'use strict';

/**
 * @ngdoc function
 * @name shoumeApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the shoumeApp
 */
angular.module('shoumeApp')
  .controller('AboutCtrl', function ($scope, $cookies) {

    $(document).ready(function() {
      $('#Carousel').carousel({
        interval: 5000
      })
    });

    $scope.removeCookies = function () {
      $cookies.remove("userConnected");
      $cookies.remove("token")
    };
  });
