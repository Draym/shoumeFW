'use strict';

/**
 * @ngdoc service
 * @name shoumeApp.submitResult
 * @description
 * # submitResult
 * Factory in the shoumeApp.
 */
angular.module('shoumeApp')
  .factory('SubmitResult', function (toaster) {
    // Service logic
    // ...

    // Public API here
    return {
      none : function() {
        return function(){};
      },
      submitSuccess: function(optionalTask, optionalMessage) {
        return function(response) {
          console.log("Success:", response);
          if (!(optionalMessage == null)) {
            toaster.success({'body': (optionalMessage == "" ? "Done" : optionalMessage)});
          }
          if (!(optionalTask == null) && (typeof optionalTask === "function")) {
            optionalTask(response);
          }
        };
      },
      submitFailure : function(optionalMessage) {
        return function(response) {
          console.log("Fail:", response);
          if (response.data != null) {
            toaster.error({'body': (response.data.message == null ? response.statusText : response.data.message)});
          } else {
            toaster.error({'body': (optionalMessage == null ? "An error happened" : optionalMessage)});
          }
        };
      }
    };
  });
