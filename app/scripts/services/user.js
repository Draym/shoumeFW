'use strict';

/**
 * @ngdoc service
 * @name shoumeApp.user
 * @description
 * # user
 * Factory in the shoumeApp.
 */
angular.module('shoumeApp')
  .factory('User', function ($cookies, DateTools, TokenManager) {
    // Service logic
    var idUserCo = "userConnected";
    var timeOut = 30;

    var init = function() {
      var token = TokenManager.get();

      console.log("init! token?:", token);
      (token == null ? disconnect() : connect());
    };

    var connect = function(token) {
      $cookies.put(idUserCo, true, {
        expires: DateTools.addMinutesToCurrentDate(timeOut)
      });
      TokenManager.put(token);
    };

    var disconnect = function() {
      $cookies.remove(idUserCo);
      $cookies.remove("token");
    };

    // Public API here
    return {
      isConnected: function () {
        var id = $cookies.get(idUserCo);

        if (id == null) {
          init();
          id = false;
        }
        console.log("connected: ", id);
        return id;
      },
      connect: function(token) {
        connect(token);
      },
      disconnect: function () {
        disconnect();
      }
    };
  });
