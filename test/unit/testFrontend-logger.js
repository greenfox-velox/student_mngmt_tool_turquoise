  // testing controller
describe('testFrontend-logger', function() {
  var $httpBackend, $rootScope, createController;
  var scope;

  // Set up the module
  beforeEach(module('managementApp'));

  beforeEach(inject(function($injector) {
    // Set up the mock http service responses
    $httpBackend = $injector.get('$httpBackend');
    // backend definition common for all tests
    $httpBackend.when('GET', '')
      .respond({});
    $httpBackend.when('POST', '/api/log')
      .respond({ level: 1, debugLogText: 'home', date: new Date(), location: 'frontend' });
    // Get hold of a scope (i.e. the root scope)
    $rootScope = $injector.get('$rootScope');
    // The $controller service is used to create instances of controllers
    var logger = $injector.get('logger');

    // "logger", function($http)
    // var $controller = $injector.get('$controller');

    // createController = function() {
    //   scope = $rootScope.$new();
    //   return $controller('mealController', {'$scope' : scope });
    // };
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });


  it('should test post /api/log', function() {
    logger.info('Hey');
    $httpBackend.expectPOST('/api/log', { level: 1, debugLogText: 'home', date: new Date(), location: 'frontend' });
    $httpBackend.flush();
  });
});
