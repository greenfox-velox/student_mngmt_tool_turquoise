'use strict';

var managementApp = angular.module('managementApp', ['ui.router']);

managementApp.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');

  $stateProvider

    .state('home', {
      url: '/',
      templateUrl: 'partial-home.html',
      controller: 'homeController'
    })

    .state('login', {
      url: '/login',
      templateUrl: 'partial-login.html',
      controller: 'loginController'
    })

    .state('register', {
      url: '/register',
      templateUrl: 'partial-register.html',
      controller: 'registerController'
    })

    .state('your', {
      url: '/your',
      controller: 'yourController',
      templateUrl: 'partial-your.html'
    })

    .state('loggedin', {
      url: '/',
      controller: 'homeController',
      templateUrl: 'partial-home-loggedin.html'
    })

    .state('logout', {
      url: '/',
      templateUrl: 'partial-home.html',
      controller: 'homeController'
    });
});

managementApp.controller('homeController', ['$scope', '$http', '$state', '$location', 'logger', function($scope, $http, $state, $location, logger) {
  logger.info('home controller');

  $scope.logOut = function() {
    $http.get(getUrl($location) + '/api/logout')
    .then(function successCallback(response) {
      $state.go('home');
    });
  };

  $http.get(getUrl($location) + '/api/loggedin')
  .then(function successCallback(response) {
    $state.go('loggedin');
  }, function errorCallback(response) {
    $state.go('home');
  });
}]);
