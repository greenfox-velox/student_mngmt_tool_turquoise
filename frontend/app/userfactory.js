'use strict';

var managementApp = angular.module('managementApp');

managementApp.factory('userFunctions', function($http, $location, $state) {

  return {
    logOut: function() {
      $http.get(getUrl($location) + '/api/logout')
      .then(function successCallback(response) {
        $state.go('home');
      });
    },
    logIn: function() {
    }
  };
});
