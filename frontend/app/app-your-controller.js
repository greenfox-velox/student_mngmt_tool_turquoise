var managementAppYour = angular.module('managementApp');
var yourUser = 'peter@email.com';

managementAppYour.controller('yourController', ['$scope', '$http', '$state', '$location', 'logger', function($scope, $http, $state, $location, logger) {
  logger.info('your controller');

  $scope.showYourData = function(yourData) {
    $scope.yourFirstname = yourData[0].firstname;
    $scope.yourLastname = yourData[0].lastname;
    $scope.yourEmail = yourData[0].email;
    $scope.yourGithub = yourData[0].github;
  };

  $http.get(getUrl($location) + '/your/' + yourUser).success(function(yourData) {
    logger.info('yourController http get');
    $scope.showYourData(yourData);
  });

  function updateYourData(whatChange, changedData, queryEmail) {
    var postData = {
      whatChange: whatChange,
      changedData: changedData,
      queryEmail: queryEmail
    };
    $http.post('/your', postData)
    .then(function successCallback() {
      logger.info('updateYourData - update data success');
    }, function errorCallback(err) {
      logger.error('updateYourData - update data error: ' + err);
    });
  }

  $scope.modifyYourData = function(value, whatChange) {
    if ($scope.form.$valid) {
      logger.info('your controller - Valid input data');
      updateYourData(whatChange, value, yourUser);
    } else {
      logger.warn('your controller - Not valid input data');
    }
  };

  $scope.logOut = function() {
    $http.get(getUrl($location) + '/api/logout')
    .then(function successCallback(response) {
      $state.go('home');
    });
  };
}]);
