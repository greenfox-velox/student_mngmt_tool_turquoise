'use strict';
var managementApp = angular.module('managementApp');

managementApp.controller('adminController', ['$scope', '$http', '$state', '$location', 'logger', 'userFunctions',

  function($scope, $http, $state, $location, logger, userFunctions) {
    logger.info('admin controller');

    $http.get('./data/companies.json').success(function(data) {
      $scope.companies = data;
    });

    $scope.addCompany = function() {
      $scope.companies.push({
        id: $scope.companies.length + 1,
        name: $scope.newcompany.name,
        available: true
      });

      $scope.newcompany.name = '';
    };

    $scope.removeCompany = function(company) {
      var removedCompany = $scope.companies.indexOf(company);
      $scope.companies[removedCompany].available = false;
    };

    $scope.undoRemoveCompany = function(company) {
      var removedCompany = $scope.companies.indexOf(company);
      $scope.companies[removedCompany].available = true;
    };

    $scope.logOut = function() {
      userFunctions.logOut();
    };
  }]);
