var managementAppYour = angular.module('managementApp');

managementAppYour.controller('yourController', ['$scope', '$http', '$state', '$location', 'logger', 'userFunctions', function($scope, $http, $state, $location, logger, userFunctions) {
  logger.info('your controller');

  $scope.showYourData = function(yourData) {
    $scope.yourFirstname = yourData[0].firstname;
    $scope.yourLastname = yourData[0].lastname;
    $scope.yourEmail = yourData[0].email;
    $scope.yourGithub = yourData[0].github;
  };

  $http.get('/your').success(function(yourData) {
    logger.info('yourController http get');
    $scope.showYourData(yourData);
  });

  function updateYourData(whatChange, changedData) {
    var postData = {
      whatChange: whatChange,
      changedData: changedData
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
      updateYourData(whatChange, value);
    } else {
      logger.warn('your controller - Not valid input data');
    }
  };

  $scope.logOut = function() {
    userFunctions.logOut();
  };
}]);
