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
    })

    .state('login', {
      url: '/login',
      templateUrl: 'partial-login.html'
    })

    .state('register', {
      url: '/register',
      templateUrl: 'partial-register.html',
      controller: 'registerController'
    });
});

managementApp.controller('homeController', ['$scope', '$http', 'logger', function($scope, $http, logger) {
  logger.info('home controller');
}]);

managementApp.controller('registerController', ['$scope', '$http', '$state', '$location', 'logger', function($scope, $http, $state, $location, logger) {
  logger.info('register controller');

  function getUrl() {
    return ($location.absUrl().split('/#/')[0]);
  }

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
      $http.post(getUrl() + '/api/register', newMemberMaker())
        .then(function successCallback(response) {
          $state.go('your');
        }, function errorCallback(response) {
          $scope.errorMsg = 'Registration error: e-mail address already exist';
        });
    } else {
      $scope.errorMsg = 'Registration error: confirmed password does not match original';
    }
    clearInputFields();
  };
}]);

managementApp.controller('studentsController', ['$scope', '$http', 'logger', function($scope, $http, logger) {
  logger.info('students controller');
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
