'use strict';

/**
 * @ngdoc overview
 * @name shoumeApp
 * @description
 * # shoumeApp
 *
 * Main module of the application.
 */
angular
  .module('shoumeApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'toastr'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/login', {
        templateUrl: 'views/login/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'login'
      })
      .when('/createAccount', {
        templateUrl: 'views/account/createAccount.html',
        controller: 'CreateAccountCtrl',
        controllerAs: 'createAccount'
      })
      .when('/allMoments', {
        templateUrl: 'views/moments/allMoments.html',
        controller: 'AllMomentsCtrl',
        controllerAs: 'allMoments'
      })
      .when('/myAccount', {
        templateUrl: 'views/account/myAccount.html',
        controller: 'MyAccountCtrl',
        controllerAs: 'myAccount'
      })
      .when('/myMoments', {
        templateUrl: 'views/moments/myMoments.html',
        controller: 'MyMomentsCtrl',
        controllerAs: 'myMoments'
      })
      .when('/myRecipes', {
        templateUrl: 'views/recipes/myRecipes.html',
        controller: 'MyRecipesCtrl',
        controllerAs: 'myRecipes'
      })
      .when('/allRecipes', {
        templateUrl: 'views/recipes/allRecipes.html',
        controller: 'AllRecipesCtrl',
        controllerAs: 'allRecipes'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
