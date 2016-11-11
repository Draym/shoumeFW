'use strict';

/**
 * @ngdoc function
 * @name shoumeApp.controller:RecipeCtrl
 * @description
 * # RecipeCtrl
 * Controller of the shoumeApp
 */
angular.module('shoumeApp')
  .controller('RecipeCtrl', function ($scope, $routeParams) {
    $scope.id = $routeParams.id;

    $scope.init = function() {
      //get the recipe by ID
    };

    $scope.init();
  });
