describe('test-app-admin-controller', function() {
  var $httpBackend;
  var $rootScope;
  var $location;
  var createController;
  var scope;

  beforeEach(module('managementApp'));

  beforeEach(inject(function($injector) {
    $httpBackend = $injector.get('$httpBackend');
    $rootScope = $injector.get('$rootScope');
    $location = $injector.get('$location');
    $httpBackend.when('POST', getUrl($location) + '/admin', '{"name":"something", "available": true}')
      .respond(1);
    $httpBackend.when('POST', getUrl($location) + '/admin')
      .respond({insertId: 2});
    $httpBackend.when('POST', 'https://student-mngmt-tool.herokuapp.com/api/log')
      .respond(200);
    $httpBackend.when('GET', getUrl($location) + '/admin')
      .respond([{id: 1, name: 'company1', available: true},
        {id: 2, name: 'company2', available: true},
        {id: 3, name: 'company3', available: true}]);
    $httpBackend.whenGET(/html/).respond(200);
    var $controller = $injector.get('$controller');
    createController = function() {
      scope = $rootScope.$new();
      return $controller('adminController', {'$scope': scope});
    };
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should test admin controller with new company data', function() {
    $httpBackend.expectPOST(getUrl($location) + '/admin');
    createController();
    scope.errorMsg = '';
    scope.newCompany = {};
    scope.companies = [];
    scope.newCompany.name = 'something';
    scope.addCompany();
    $httpBackend.flush();
    expect(scope.newCompany).toBeDefined();
    expect(scope.newCompany.name).toBe('');
    expect(scope.companies.length).toBe(4);
    expect(scope.errorMsg).toBe('');
  });

//   it('should test admin controller with modified company name', function() {
//   //  $httpBackend.expectPOST(getUrl($location) + '/admin');
//     // createController();
//     // scope.company.name = 'something';
//     // scope.editing();
//     // scope.company.name = 'somethingelse';
//     // scope.save();
//     // $httpBackend.flush();
//     // expect(scope.company.name).toBe('somethingelse');
//     // expect(scope.errorMsg).toBe('');
//   });
//
//   it('should test admin controller with modified company availability', function() {
//     $httpBackend.expectPOST(getUrl($location) + '/admin');
//     createController();
//     scope.company.name = 'something';
//     scope.company.available = true;
//     scope.company.id = 3;
//     scope.removeCompany(3);
//     $httpBackend.flush();
//     expect(scope.company.available).toBe(false);
//     expect(scope.errorMsg).toBe('');
//   });
});
