var routerApp = angular.module('routerApp', ['ui.router']);

routerApp.config(function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/home');

  $stateProvider

    .state('home', {
      url: '/home',
      templateUrl: 'partial-home.html'
    })

    .state('home.list', {
      url: '/list',
      templateUrl: 'partial-home-list.html',
      controller: function($scope) {
        $scope.dogs = ['Bernese', 'Husky', 'Goldendoodle'];
      }
    })

    .state('home.paragraph', {
      url: '/paragraph',
      template: 'I could sure use a drink right now.'
    });
});
