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
        name: $scope.newcompany.name,
        available: true
      });

      $scope.newcompany.name = '';
    };

    $scope.editCompany = function(company) {
      return;
    };

    $scope.saveCompany = function(company) {
      $scope.newcompany.name = company.name;
    };

    $scope.removeCompany = function(company) {
      var removedCompany = $scope.companies.indexOf(company);
      removedCompany.available = false;
    };

    $scope.undoRemoveCompany = function(company) {
      var removedCompany = $scope.companies.indexOf(company);
      removedCompany.available = true;
    };

    $scope.logOut = function() {
      userFunctions.logOut();
    };
  }]);
