describe('studentsController', function() {
  var $httpBackend;
  var $rootScope;
  var createController;
  var scope;

  beforeEach(module('managementApp'));

  beforeEach(inject(function($injector) {
    $httpBackend = $injector.get('$httpBackend');
    $rootScope = $injector.get('$rootScope');
    var $controller = $injector.get('$controller');

    createController = function() {
      scope = $rootScope.$new();
      return $controller('studentsController', {'$scope': scope });
    };
  }));

  it ('defining students', function() {
    createController();
    expect(scope.students).toBeDefined();
  });
});
