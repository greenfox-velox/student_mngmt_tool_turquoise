  // testing controller
describe('studentsController', function() {
  var $httpBackend, $rootScope, createController, authRequestHandler;
  var scope;

  // Set up the module
  beforeEach(module('routerApp'));

  beforeEach(inject(function($injector) {
    // Set up the mock http service responses
    $httpBackend = $injector.get('$httpBackend');
    // backend definition common for all tests
    authRequestHandler = $httpBackend.when('GET', 'http://localhost:3000/#/student')
                          .respond({'students': [{id: 1, name: 'Shirinbekov Oleg', scholarship: 'yes', result: 40}]});
    // Get hold of a scope (i.e. the root scope)
    authRequestHandler = $httpBackend.when('DELETE', 'http://localhost:3000/meals/5')
                          .respond({});
    // Get hold of a scope (i.e. the root scope)
    $rootScope = $injector.get('$rootScope');
    // The $controller service is used to create instances of controllers
    var $controller = $injector.get('$controller');

    createController = function() {
      scope = $rootScope.$new();
      return $controller('studentsController', {'$scope' : scope });
    };
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should get 1 student from the with $http', function() {
    $httpBackend.expectGET('http://localhost:3000/#/students');
    var controller = createController();
    $httpBackend.flush();
    expect(scope.students).toBeDefined();
    expect(scope.students.length).toBe(1);
    expect(scope.students[0].id).toBe(1);
    expect(scope.students[0].name).toBe('Shirinbekov Oleg');
    expect(scope.students[0].scholarship).toBe('yes');
    expect(scope.students[0].result).toEqual(40);
    expect(scope.students[0].deleted).toBe(false);
  });

  it('should initailize the newStudent scope', function() {
    expect(scope.newStudent).toBeDefined();
  });
});
