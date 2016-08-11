var logger = require(./frontend-logger);
var routerApp = angular.module('routerApp', ['ui.router']);

routerApp.config(function($stateProvider, $urlRouterProvider) {
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
        'columnOne@student': { template: 'The selected student is: ' },
        'columnTwo@student': {
          templateUrl: 'table-data.html',
          controller: 'studentsController'
        }
      }
    });
});

routerApp.controller('homeController', ['$scope', '$http', function($scope, $http) {
  logger('home', level, new Date());
}]);

routerApp.controller('studentsController', ['$scope', '$http', function($scope, $http) {
  logger('students', level, new Date());
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
