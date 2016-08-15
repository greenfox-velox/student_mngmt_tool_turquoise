var managementApp = angular.module('managementApp', ['ui.router']);

managementApp.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');

  $stateProvider

    .state('home', {
      url: '/',
      templateUrl: 'partial-home.html',
      controller: 'homeController'
    })

    .state('home.teacher', {
      url: '/teacher',
      templateUrl: 'partial-home-list.html'
    })

    .state('home.student', {
      url: '/student',
      template: 'You are a student. Please input your name and password.'
    })

    .state('student', {
      url: '/student',
      views: {
        '': { templateUrl: 'partial-about.html' },
        'columnOne@student': {
          templateUrl: 'selected-data.html',
          controller: 'studentsController'
        },
        'columnTwo@student': {
          templateUrl: 'table-data.html',
          controller: 'studentsController'
        }
      }
    });
});

managementApp.controller('homeController', ['$scope', '$http', 'logger', function($scope, $http, logger) {
  logger.info('Alright mate');
}]);

managementApp.controller('studentsController', ['$scope', '$http', 'logger', function($scope, $http, logger) {
  logger.info('Alright mate');
  $scope.students = [
    {
      name: 'Shirinbekov Oleg',
      scholarship: 'yes',
      result: 40
    },
    {
      name: 'Galaschek Péter',
      scholarship: 'no',
      result: 38
    },
    {
      name: 'Mbemba Jean-Claude',
      scholarship: 'yes',
      result: 43
    }
  ];
}]);
