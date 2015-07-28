'use strict';

(function(angular) {
  angular.module('angular-chosen', []);

  angular.directive('chosen', function() {
    return {
      restrict: 'A',
      require: '^ngModel',
      link: function(scope, iElement, iAttrs, controller, transcludeFn) {

      }
    };
  });
})(angular);