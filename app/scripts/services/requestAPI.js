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

    var api_url = 'http://92.222.72.189:4243/api';
    // Public API here
    return {
      POST: function (url, data, success, failure, token) {
        $http({
          method: 'POST',
          url:  api_url + url + (token != null ? "?token=" + token : ""),
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
      },
      GET: function (url, success, failure, token) {
        $http({
          method: 'GET',
          url: api_url + url + (token != null ? "?token=" + token : ""),
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then(
          function (response) {
            // success callback
            if (response.data != null && ((response.data.success != null && response.data.success == true) || response.data.success == null)) {
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
