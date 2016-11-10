'use strict';

/**
 * @ngdoc function
 * @name shoumeApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the shoumeApp
 */
angular.module('shoumeApp')
  .controller('MainCtrl', function ($scope, TokenManager) {

    console.log("Salut: ", TokenManager.get());
  });
