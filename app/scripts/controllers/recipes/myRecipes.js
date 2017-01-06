'use strict';

/**
 * @ngdoc function
 * @name shoumeApp.controller:MyRecipesCtrl
 * @description
 * # MyRecipesCtrl
 * Controller of the shoumeApp
 */
angular.module('shoumeApp')
  .controller('MyRecipesCtrl', function ($scope, $uibModal, $timeout, $location, toaster, User, SubmitResult, RequestAPI, CloneUtilsCustom) {


    $scope.itemsPerPage = 6;
    $scope.pagedItems = [];
    $scope.currentPage = 0;

    /*** PAGINATION ***/
    $scope.groupToPages = function () {
      $scope.pagedItems = [];

      for (var i = 0; i < $scope.recipes.length; i++) {
        if (i % $scope.itemsPerPage === 0) {
          $scope.pagedItems[Math.floor(i / $scope.itemsPerPage)] = [$scope.recipes[i]];
        } else {
          $scope.pagedItems[Math.floor(i / $scope.itemsPerPage)].push($scope.recipes[i]);
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

    $scope.lastPage = function () {
      return $scope.currentPage == $scope.pagedItems.length - 1
    };

    $scope.firstPage = function () {
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
    var parseByName = function () {
      if ($scope.searchName && $scope.searchName != "") {
        for (var i = 0; i < $scope.recipes.length; ++i) {
          if (!$scope.recipes[i].name.toLowerCase().includes($scope.searchName.toLowerCase())) {
            $scope.recipes.splice(i, 1);
            --i;
          }
        }
      }
    };

    var parseByTag = function () {
      if ($scope.searchTag && $scope.searchTag != "") {
        for (var i = 0; i < $scope.recipes.length; ++i) {
          var find = false;
          for (var i2 = 0; i2 < $scope.recipes[i].tags.length; ++i2) {
            if ($scope.recipes[i].tags[i2].toLowerCase().includes($scope.searchTag.toLowerCase())) {
              find = true;
            }
          }
          if (!find) {
            $scope.recipes.splice(i, 1);
            --i;
          }
        }
      }
    };

    $scope.sortParsedRecipes = function () {
      $scope.recipes.sort(function(item1, item2){
        return item1.date < item2.date;
      });
    };

    $scope.parseUnparsedRecipes = function () {
      $scope.currentPage = 0;
      $scope.recipes = CloneUtilsCustom.cloneArray($scope.unparsedRecipes);

      parseByName();
      parseByTag();
      $scope.sortParsedRecipes();
      $scope.groupToPages();
    };

    /*** FUNCTIONS ***/

    $scope.openAddRecipeModal = function() {
      var modalInstance = $uibModal.open({
        templateUrl: 'views/recipes/addRecipeModal.html',
        controller: 'AddRecipeModalCtrl',
        size: 'lg',
        scope: $scope
      });
    };

    $scope.openDetail = function(id) {
      $location.path("/recipe/" + id);
    };

    /*** LOAD ***/

    $scope.init = function () {
      RequestAPI.GET("/user/" + User.getId() + "/recipes", SubmitResult.submitSuccess(function (response) {
          $scope.unparsedRecipes = response.data;

          for (var i = 0; i < $scope.unparsedRecipes.length; ++i) {
            try {
              if ($scope.unparsedRecipes[i].tags.length == 1 && $scope.unparsedRecipes[i].tags[0].includes(",")) {
                var values = $scope.unparsedRecipes[i].tags[0];

                $scope.unparsedRecipes[i].tags = values.split(",");
              }
              $scope.unparsedRecipes[i].description = JSON.parse($scope.unparsedRecipes[i].description);
              $scope.unparsedRecipes[i].low = false;
            } catch (e) {
              $scope.unparsedRecipes[i].low = true;
            }
          }

          $scope.parseUnparsedRecipes();

        }),
        SubmitResult.submitFailure(), User.getToken());
    };

    $scope.init();

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
        $scope.parseUnparsedRecipes();
      }, tempo); // delay in ms
    });

    var tempFilterText2 = '',
      filterTextTimeout2;
    $scope.$watch('searchTag', function (val) {
      if (filterTextTimeout2) {
        $timeout.cancel(filterTextTimeout2);
      }
      tempFilterText2 = val;
      filterTextTimeout2 = $timeout(function () {
        if ($scope.searchTag == null) {
          return;
        }
        $scope.parseUnparsedRecipes();
      }, tempo); // delay in ms
    });

  });
