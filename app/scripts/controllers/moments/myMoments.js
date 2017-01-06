'use strict';

/**
 * @ngdoc function
 * @name shoumeApp.controller:MyMomentsCtrl
 * @description
 * # MyMomentsCtrl
 * Controller of the shoumeApp
 */
angular.module('shoumeApp')
  .controller('MyMomentsCtrl', function ($scope, $uibModal, $timeout, $location, toaster, User, SubmitResult, RequestAPI, CloneUtilsCustom) {

    $scope.itemsPerPage = 6;
    $scope.pagedItems = [];
    $scope.currentPage = 0;

    /*** PAGINATION ***/
    $scope.groupToPages = function () {
      $scope.pagedItems = [];

      for (var i = 0; i < $scope.moments.length; i++) {
        if (i % $scope.itemsPerPage === 0) {
          $scope.pagedItems[Math.floor(i / $scope.itemsPerPage)] = [$scope.moments[i]];
        } else {
          $scope.pagedItems[Math.floor(i / $scope.itemsPerPage)].push($scope.moments[i]);
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
    var parseByTitle = function () {
      if ($scope.searchTitle && $scope.searchTitle != "") {
        for (var i = 0; i < $scope.moments.length; ++i) {
          if (!$scope.moments[i].title.toLowerCase().includes($scope.searchTitle.toLowerCase())) {
            $scope.moments.splice(i, 1);
            --i;
          }
        }
      }
    };

    var parseByContent = function () {
      if ($scope.searchContent && $scope.searchContent != "") {
        for (var i = 0; i < $scope.moments.length; ++i) {
          if (!$scope.moments[i].content.toLowerCase().includes($scope.searchTitle.toLowerCase())) {
            $scope.moments.splice(i, 1);
            --i;
          }
        }
      }
    };

    $scope.sortParsedMoments = function () {
      $scope.moments.sort(function(item1, item2){
        return item1.date < item2.date;
      });
    };

    $scope.parseUnparsedMoments = function () {
      $scope.currentPage = 0;
      $scope.moments = CloneUtilsCustom.cloneArray($scope.unparsedMoments);

      parseByTitle();
      parseByContent();
      $scope.sortParsedMoments();
      $scope.groupToPages();
    };

    /*** FUNCTION ***/

    $scope.openAddMomentModal = function() {
      var modalInstance = $uibModal.open({
        templateUrl: 'views/moments/addMomentModal.html',
        controller: 'AddMomentModalCtrl',
        size: 'lg',
        scope: $scope
      });
    };

    $scope.openDetail = function(id) {
      $location.path("/moment/" + id);
    };

    /*** LOAD ***/
    $scope.init = function () {
      RequestAPI.GET("/user/" + User.getId() + "/moments", SubmitResult.submitSuccess(function (response) {
          $scope.unparsedMoments = response.data;

          for (var i = 0; i < $scope.unparsedMoments.length; ++i) {
            try {
              $scope.unparsedMoments[i].images = JSON.parse($scope.unparsedMoments[i].image_url);
            } catch (e) {
              $scope.unparsedMoments[i].images = [];
            }
          }
          $scope.parseUnparsedMoments();
        }),
        SubmitResult.submitFailure(), User.getToken());
    };

    $scope.init();

    // Instantiate these variables outside the watch
    var tempo = 400;
    var tempFilterText = '',
      filterTextTimeout;

    $scope.$watch('searchTitle', function (val) {
      if (filterTextTimeout) {
        $timeout.cancel(filterTextTimeout);
      }
      tempFilterText = val;
      filterTextTimeout = $timeout(function () {
        if ($scope.searchTitle == null) {
          return;
        }
        $scope.parseUnparsedMoments();
      }, tempo); // delay in ms
    });

    var tempFilterText2 = '',
      filterTextTimeout2;
    $scope.$watch('searchContent', function (val) {
      if (filterTextTimeout2) {
        $timeout.cancel(filterTextTimeout2);
      }
      tempFilterText2 = val;
      filterTextTimeout2 = $timeout(function () {
        if ($scope.searchContent == null) {
          return;
        }
        $scope.parseUnparsedMoments();
      }, tempo); // delay in ms
    });
  });
