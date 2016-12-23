'use strict';

/**
 * @ngdoc function
 * @name shoumeApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the shoumeApp
 */
angular.module('shoumeApp')
  .controller('MainCtrl', function ($scope, User) {

    console.log("Salut: ", User.getToken());
  });
