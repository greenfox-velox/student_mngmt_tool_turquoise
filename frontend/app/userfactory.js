'use strict';

var managementApp = angular.module('managementApp');

managementApp.factory('userFunctions', function($http, $location, $state) {

  return {
    logOut: function() {
      return $http.get(getUrl($location) + '/api/logout');
    },
    logIn: function() {
    }
  };
});
