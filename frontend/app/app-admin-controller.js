'use strict';
var managementApp = angular.module('managementApp');

managementApp.controller('adminController', ['$scope', '$http', '$state', '$location', 'logger', 'userFunctions',

  function($scope, $http, $state, $location, logger, userFunctions) {
    logger.info('admin controller');

    $http.get('./data/companies.json').success(function(data) {
      $scope.companies = data;
    });

    $scope.removeCompany = function(company) {
      var removedCompany = $scope.companies.indexOf(company);
      $scope.companies.splice(removedCompany, 1);
    };

    $scope.logOut = function() {
      userFunctions.logOut();
    };
  }]);
