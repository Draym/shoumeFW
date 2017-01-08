'use strict';

/**
 * @ngdoc function
 * @name shoumeApp.controller:ManageIngredientCtrl
 * @description
 * # ManageIngredientCtrl
 * Controller of the shoumeApp
 */
angular.module('shoumeApp')
  .controller('ManageIngredientCtrl', function ($scope, $timeout, $uibModal, toaster, SubmitResult, RequestAPI, User, CloneUtilsCustom) {

    $scope.isBusy = false;
    $scope.sortByPseudoASC = false;
    $scope.sortByPseudoDESC = false;
    $scope.ingredients = [];
    $scope.itemsPerPage = 10;
    $scope.pagedItems = [];
    $scope.currentPage = 0;

    /*** PAGINATION ***/
    $scope.groupToPages = function () {
      $scope.pagedItems = [];

      for (var i = 0; i < $scope.ingredients.length; i++) {
        if (i % $scope.itemsPerPage === 0) {
          $scope.pagedItems[Math.floor(i / $scope.itemsPerPage)] = [ $scope.ingredients[i] ];
        } else {
          $scope.pagedItems[Math.floor(i / $scope.itemsPerPage)].push($scope.ingredients[i]);
        }
      }
    };

    $scope.range = function (start, end) {
      var ret = [];
      var max = 3;

      if (start + max > end) {
        start = end - max;
      }
      if (start > (end / 2)) {
        ret.push(-1);
      }
      for (var i = 0; i < max; i++) {
        ret.push(start + i);
      }
      if (start < (end / 2)) {
        ret.push(-2);
      }
      return ret;
    };

    $scope.lastPage = function() {
      return $scope.currentPage == $scope.pagedItems.length - 1
    };

    $scope.firstPage = function() {
      return $scope.currentPage == 0;
    };

    $scope.prevPage = function () {
      if ($scope.currentPage > 0) {
        $scope.currentPage--;
      }
    };

    $scope.nextPage = function () {
      if ($scope.currentPage < $scope.pagedItems.length - 1) {
        $scope.currentPage++;
      }
    };

    $scope.setPage = function (val) {
      if (val < 0) {
        val = (val == -1 ? 0 : $scope.pagedItems.length - 1);
      }
      $scope.currentPage = val;
    };

    /*** PARSER ***/
    var parseByName = function() {
      if ($scope.searchName && $scope.searchName != "") {
        for (var i = 0; i < $scope.ingredients.length; ++i) {
          if (!$scope.ingredients[i].name.toLowerCase().includes($scope.searchName.toLowerCase())) {
            $scope.ingredients.splice(i, 1);
            --i;
          }
        }
      }
    };

    $scope.parseUnparsedIngredients = function () {
      $scope.currentPage = 0;
      $scope.ingredients = CloneUtilsCustom.cloneArray($scope.unparsedIngredients);

      parseByName();
      $scope.groupToPages();
    };


    /*** LOAD ***/
    $scope.loadIngredients = function () {
      $scope.isBusy = true;
      RequestAPI.GET("/ingredients", SubmitResult.submitSuccess(function (response) {
          $scope.unparsedIngredients = response.data;
          $scope.parseUnparsedIngredients();
          $scope.isBusy = false;
        }),
        SubmitResult.submitFailure(function () {
          $scope.isBusy = false;
        }), User.getToken());
    };

    $scope.initIngredients = function () {
      $scope.loadIngredients();
    };

    $scope.initIngredients();

    // Instantiate these variables outside the watch
    var tempo = 400;
    var tempFilterText = '',
      filterTextTimeout;

    $scope.$watch('searchName', function (val) {
      if (filterTextTimeout) {
        $timeout.cancel(filterTextTimeout);
      }
      tempFilterText = val;
      filterTextTimeout = $timeout(function () {
        if ($scope.searchName == null) {
          return;
        }
        $scope.parseUnparsedIngredients();
      }, tempo); // delay in ms
    })
  });
