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
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'login'
      })
      .when('/createAccount', {
        templateUrl: 'views/createAccount.html',
        controller: 'CreateAccountCtrl',
        controllerAs: 'createAccount'
      })
      .when('/listMoments', {
        templateUrl: 'views/listMoments.html',
        controller: 'ListmomentsCtrl',
        controllerAs: 'listMoments'
      })
      .when('/myAccount', {
        templateUrl: 'views/myAccount.html',
        controller: 'MyAccountCtrl',
        controllerAs: 'myAccount'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
