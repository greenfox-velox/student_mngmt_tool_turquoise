describe('test-app-register-controller', function() {
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
    $httpBackend.when('POST', getUrl($location) + '/api/register', '{"email":"asd","password":"asd"}')
      .respond(500);
    $httpBackend.when('POST', getUrl($location) + '/api/register')
      .respond(200);
    $httpBackend.when('POST', 'https://student-mngmt-tool.herokuapp.com/api/log')
      .respond(200);
    $httpBackend.whenGET(/html/).respond(200);
    var $controller = $injector.get('$controller');
    createController = function() {
      scope = $rootScope.$new();
      return $controller('registerController', {'$scope': scope});
    };
  }));

  afterEach(function() {
     $httpBackend.verifyNoOutstandingExpectation();
     $httpBackend.verifyNoOutstandingRequest();
  });

  it('should test register controller with correct data', function() {
    $httpBackend.expectPOST(getUrl($location) + '/api/register');
    createController();
    scope.errorMsg = '';
    scope.newMember = {};
    scope.newMember.password = 'asd';
    scope.newMember.confirmPassword = 'asd';
    scope.newMember.email = 'asd@asd.as';
    scope.submitRegister();
    $httpBackend.flush();
    expect(scope.newMember).toBeDefined();
    expect(scope.newMember.password).toBe('');
    expect(scope.newMember.confirmPassword).toBe('');
    expect(scope.newMember.email).toBe('');
    expect(scope.newMember.password).toBe('');
    expect(scope.errorMsg).toBe('');
  });

  it('should test register controller with password and confirmPassword do not match', function() {
    createController();
    scope.errorMsg = '';
    scope.newMember = {};
    scope.newMember.password = 'asd';
    scope.newMember.confirmPassword = 'asdq';
    scope.newMember.email = 'asd@asd.as';
    scope.submitRegister();
    $httpBackend.flush();
    expect(scope.newMember).toBeDefined();
    expect(scope.newMember.password).toBe('');
    expect(scope.newMember.confirmPassword).toBe('');
    expect(scope.newMember.email).toBe('');
    expect(scope.newMember.password).toBe('');
    expect(scope.errorMsg).toBe('Registration error: confirmed password does not match original');
  });

  it('should test register controller with password and confirmPassword do not match', function() {
    $httpBackend.expectPOST(getUrl($location) + '/api/register', { email: 'asd', password: 'asd' });
    createController();
    scope.errorMsg = '';
    scope.newMember = {};
    scope.newMember.password = 'asd';
    scope.newMember.confirmPassword = 'asd';
    scope.newMember.email = 'asd';
    scope.submitRegister();
    $httpBackend.flush();
    expect(scope.newMember).toBeDefined();
    expect(scope.newMember.password).toBe('');
    expect(scope.newMember.confirmPassword).toBe('');
    expect(scope.newMember.email).toBe('');
    expect(scope.newMember.password).toBe('');
    expect(scope.errorMsg).toBe('Registration error: e-mail address is not valid or already exist');
  });
});
