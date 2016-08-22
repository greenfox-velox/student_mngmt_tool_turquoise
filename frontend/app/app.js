'use strict';

var yourUrl = 'http://localhost:3000';
var yourUser = 'peter@email.com';
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
    });
});

managementApp.controller('homeController', ['$scope', '$http', 'logger', function($scope, $http, logger) {
  logger.info('home controller');
  $http.get(yourUrl + '/your/' + yourUser).success(function(yourData) {
    logger.info('yourController http get');
    $scope.showYourData(yourData);
  });
}]);
