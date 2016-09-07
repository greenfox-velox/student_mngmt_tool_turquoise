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

    $scope.removeCompany = function(company) {
      var removedCompany = $scope.companies.indexOf(company);
      $http.delete(getUrl($location) + '/admin/' + $scope.companies[removedCompany].id).success(function() {});
      $scope.companies.splice(removedCompany, 1);
    };

    $scope.undoRemoveCompany = function() {
      // $scope.companies[removedCompany].available = true;
      // var removedCompanyData = [$scope.companies[removedCompany].available, $scope.companies[editedCompany].id];
      // $http.put(getUrl($location) + '/admin', removedCompanyData).success(function(data) {
      //   $scope.companies[$scope.companies.length - 1].id = data.company.id;
      // });
    };

    $scope.logOut = function() {
      userFunctions.logOut();
    };
  }]);
