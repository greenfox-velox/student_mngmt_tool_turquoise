var managementAppYour = angular.module('managementApp');
// var yourUrl = 'https://student-mngmt-tool.herokuapp.com';
var yourUrl = 'http://localhost:3000';
var yourUser = 'peter@email.com';

managementAppYour.controller('yourController', ['$scope', '$http', 'logger', function($scope, $http, logger) {
  logger.info('your controller');

  $scope.showYourData = function(yourData) {
    $scope.yourFirstname = yourData[0].firstname;
    $scope.yourLastname = yourData[0].lastname;
    $scope.yourEmail = yourData[0].email;
    $scope.yourGithub = yourData[0].github;
  };

  $http.get(yourUrl + '/your/' + yourUser).success(function(yourData) {
    logger.info('yourController http get');
    $scope.showYourData(yourData);
  });

  $scope.modifyYourData = function(target) {
    window.alert('Modify: ' + target);
    console.log(target);
  };
}]);
