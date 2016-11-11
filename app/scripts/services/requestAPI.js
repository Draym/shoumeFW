'use strict';

/**
 * @ngdoc service
 * @name shoumeApp.requestAPI
 * @description
 * # requestAPI
 * Factory in the shoumeApp.
 */
angular.module('shoumeApp')
  .config(['$routeProvider', '$httpProvider', function($routeProvider, $httpProvider) {
    $httpProvider.defaults.headers.common = {};
    $httpProvider.defaults.headers.post = {};
    $httpProvider.defaults.headers.put = {};
    $httpProvider.defaults.headers.patch = {};
  }])
  .factory('RequestAPI', function ($http) {
    // Service logic
    // ...

    // Public API here
    return {
      POST: function (url, data, success, failure) {
        $http({
          method: 'POST',
          url: 'https://shoume-keysim.c9users.io:8080/api' + url,
          data: data,
          transformRequest: function(obj) {
            var str = [];
            for(var p in obj)
              str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
            return str.join("&");
          },
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then(
          function (response) {
            // success callback
            if (response.data != null && response.data.success == true) {
              success(response);
            } else {
              failure(response);
            }
          },
          function (response) {
            // failure callback
            failure(response);
          }
        );
      }
    };
  });
