'use strict';
var managementApp = angular.module('managementApp');

managementApp.controller('registerController', ['$scope', '$http', '$state', '$location', 'logger', function($scope, $http, $state, $location, logger) {
  logger.info('register controller');

  function clearInputFields() {
    $scope.newMember.email = '';
    $scope.newMember.password = '';
    $scope.newMember.confirmPassword = '';
  }

  function newMemberMaker() {
    return { email: $scope.newMember.email, password: $scope.newMember.password };
  }

  $scope.submitRegister = function() {
    if ($scope.newMember.password === $scope.newMember.confirmPassword) {
      $http.post(getUrl($location) + '/api/register', newMemberMaker())
        .then(function successCallback(response) {
          $state.go('your');
        }, function errorCallback(response) {
          $scope.errorMsg = 'Registration error: e-mail address is not valid or already exist';
        });
    } else {
      $scope.errorMsg = 'Registration error: confirmed password does not match original';
    }
    clearInputFields();
  };
}]);
