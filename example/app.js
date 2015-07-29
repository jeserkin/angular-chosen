'use strict';

angular.module('app', ['angular-chosen']);

angular.module('app')
  .controller('AngularCtrl', function($scope) {
    // Base
    $scope.options = {
      selectedStaticOption: undefined,
      selectedOptionFromHash: undefined,
      selectedDisabledOption: undefined,
      selectedMultipleOptions: undefined
    };

    // Hash
    $scope.optionsAsHash = ['grooo', 'wowowowow', 'lakakalakakl', 'yadayada', 'insight', 'delve', 'synergy'];

    // Disabling
    var optionsForEmptyCollection = ['look', 'i', 'have', 'data'];
    $scope.optionsForEmptyCollection = optionsForEmptyCollection;

    $scope.isEmptyCollection = false;
    $scope.toggleEmpty = function() {
      $scope.isEmptyCollection = !$scope.isEmptyCollection;

      if ($scope.isEmptyCollection) {
        $scope.options.selectedDisabledOption = undefined;
        $scope.optionsForEmptyCollection = [];
      }
      else {
        $scope.optionsForEmptyCollection = optionsForEmptyCollection;
      }
    };

    // External changing
    $scope.optionsForExternalChange = {
      cat: 'Cat',
      dog: 'Dog',
      hamster: 'Hamster'
    };
    $scope.options.selectedMultipleOptions = ['cat'];
  });