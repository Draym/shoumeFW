'use strict';

/**
 * @ngdoc function
 * @name shoumeApp.controller:AddRecipeModalCtrl
 * @description
 * # AddRecipeModalCtrl
 * Controller of the shoumeApp
 */
angular.module('shoumeApp')
  .controller('AddRecipeModalCtrl', function ($scope, $uibModalInstance, RequestAPI, SubmitResult, User, FileUploader, CloneUtilsCustom) {
    $scope.flow = {};
    $scope.uploader = new FileUploader();

    $scope.ingredientsStock = [];
    $scope.myIngredients = [];

    $scope.isBusy = false;
    $scope.recipe = {
      name: "",
      description: {description: "", difficulty: "", preparation: 0, cooking: 0, people: 0, steps: []},
      image: "",
      ingredients: [],
      tags: []
    };

    $scope.addTag = function () {
      if ($scope.tag) {
        $scope.recipe.tags.push($scope.tag);
        $scope.tag = "";
      }
    };

    $scope.addIngredient = function () {
      if ($scope.ingredients) {
        for (var i = 0; i < $scope.ingredients.length; ++i) {
          if ($scope.ingredients[i].id == $scope.myIngredient) {
            $scope.myIngredients.push({quantity: $scope.quantity, unit: $scope.unit, value: $scope.ingredients[i]});
          }
        }
      }
    };

    $scope.removeIngredient = function (index) {
      $scope.myIngredients.splice(index, 1);
    };

    $scope.moveIngredient = function (index, mode) {
      var tmp;

      if (mode == "down" && index != $scope.myIngredients.length - 1) {
        tmp = $scope.myIngredients[index + 1];
        $scope.myIngredients[index + 1] = $scope.myIngredients[index];
        $scope.myIngredients[index] = tmp;
      }
      else if (mode == "up" && index != 0) {
        tmp = $scope.myIngredients[index - 1];
        $scope.myIngredients[index - 1] = $scope.myIngredients[index];
        $scope.myIngredients[index] = tmp;
      }
    };

    $scope.addStep = function () {
      $scope.recipe.description.steps.push({index: $scope.recipe.description.steps.length + 1, value: ""});
    };

    $scope.removeStep = function (index) {
      if ($scope.recipe.description.steps.length > 1) {
        $scope.recipe.description.steps.splice(index, 1);
        for (var i = 0; i < $scope.recipe.description.steps.length; ++i) {
          $scope.recipe.description.steps[i].index = i + 1;
        }
      }
    };

    $scope.loadIngredients = function () {
      RequestAPI.GET("/ingredients", SubmitResult.submitSuccess(function (response) {
          $scope.ingredients = response.data;

          try {
            for (var i = 0; i < $scope.ingredients.length; ++i) {
              $scope.ingredientsStock.push({value: $scope.ingredients[i].id, label: $scope.ingredients[i].name});
            }
          } catch (e) {
          }
        }),
        SubmitResult.submitFailure(), User.getToken());
    };

    var loadAll = function () {

      $scope.addStep();
      $scope.loadIngredients();
    };


    $scope.save = function () {
      //$scope.isBusy = true;
      var recipeFormat = CloneUtilsCustom.cloneObject($scope.recipe);

      recipeFormat.description.total = recipeFormat.description.preparation + recipeFormat.description.cooking;
      recipeFormat.description.ingredients = [];
      for (var i = 0; i < $scope.myIngredients.length; ++i) {
        recipeFormat.description.ingredients.push($scope.myIngredients[i].quantity + " " + $scope.myIngredients[i].unit + " " + $scope.myIngredients[i].value.name);
      }
      recipeFormat.description = JSON.stringify(recipeFormat.description);

      RequestAPI.POST("/recipe", recipeFormat, SubmitResult.submitSuccess(function (response) {
          $scope.init();
          $scope.clear();
          $scope.isBusy = false;
        }, "Recipe created"),
        SubmitResult.submitFailure(function(){
          $scope.isBusy = false;
        }), User.getToken());
    };

    $scope.limitFiles = function($files, max) {
      if ($files.length > max) {
        $files.length = max;
      }
    };

    $scope.clear = function () {
      $uibModalInstance.dismiss('cancel');
    };

    loadAll();
  });
