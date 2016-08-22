'use strict';
var managementApp = angular.module('managementApp');

managementApp.controller('loginController', ['$scope', '$http', '$state', '$location', 'logger', function($scope, $http, $state, $location, logger) {
  logger.info('login controller');

  function getUrl() {
    return ($location.absUrl().split('/#/')[0]);
  }

  function clearInputFields() {
    $scope.loggedinMember.email = '';
    $scope.loggedinMember.password = '';
    $scope.errorMsg = '';
  }

  function memberLogin() {
    return { email: $scope.loggedinMember.email, password: $scope.loggedinMember.password };
  }

  $scope.submitLogin = function() {
    $http.post(getUrl() + '/api/login', memberLogin())
      .then(function successCallback(response) {
        $state.go('your');
      }, function errorCallback(response) {
        $scope.errorMsg = 'Login error: e-mail and password do not match';
      });
    clearInputFields();
  };
}]);
