'use strict';
var managementApp = angular.module('managementApp');

managementApp.controller('adminController', ['$scope', '$http', '$state', '$location', 'logger', 'userFunctions',

  function($scope, $http, $state, $location, logger, userFunctions) {
    logger.info('admin controller');

    $http.get(getUrl($location) + '/admin').success(function(data) {
      $scope.companies = data;
    });

    function companyMaker() {
      return {
        name: $scope.newCompany.name,
        available: true
      };
    }

    $scope.addCompany = function() {
      var companyToAdd = companyMaker();
      $scope.companies.push(companyToAdd);
      $http.post(getUrl($location) + '/admin', companyToAdd).success(function(data) {
        $scope.companies[$scope.companies.length - 1].id = data.insertId;
        $scope.newCompany.name = '';
      });
    };

    $scope.normalMode = true;
    var nameOfEditedCompany = '';

    $scope.editing = function(company) {
      $scope.editMode = true;
      $scope.normalMode = false;
      nameOfEditedCompany = company.name;
    };

    $scope.save = function(company) {
      var editedCompany = $scope.companies.indexOf(company);
      var editedCompanyData = {name: $scope.companies[editedCompany].name, id: $scope.companies[editedCompany].id};
      $scope.editMode = false;
      $scope.normalMode = true;
      $http.put(getUrl($location) + '/admin', editedCompanyData).success(function() {});
    };

    $scope.cancel = function(company) {
      $scope.companies[$scope.companies.indexOf(company)].name = nameOfEditedCompany;
      $scope.editMode = false;
      $scope.normalMode = true;
    };

    var removedCompanyId;

    $scope.removeCompany = function(company) {
      removedCompanyId = $scope.companies[$scope.companies.indexOf(company)].id;
      $http.delete(getUrl($location) + '/admin/' + removedCompanyId).success(function() {});
      $scope.companies[$scope.companies.indexOf(company)].available = 0;
    };

    $scope.undoRemoveCompany = function() {
      $scope.companies.forEach(function(e, i) {
        if (e.id === removedCompanyId) {
          $scope.companies[i].available = 1;
        }
      });
      var removedCompany = {id: removedCompanyId};
      $http.put(getUrl($location) + '/undo', removedCompany).success(function() {});
    };

    $scope.logOut = function() {
      userFunctions.logOut();
    };
  }]);
