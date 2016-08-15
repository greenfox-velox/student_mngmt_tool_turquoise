describe('testFrontend-logger', function() {
  var $httpBackend, logger;

  beforeEach(module('managementApp'));

  beforeEach(inject(function($injector) {

    $httpBackend = $injector.get('$httpBackend');

    $httpBackend.when('GET', '')
      .respond({});
    $httpBackend.when('POST', 'https://student-mngmt-tool.herokuapp.com/api/log')
      .respond({ level: 'info', debugLogText: 'Hey', location: 'frontend' });

    logger = $injector.get('logger');

  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should test logger.debug', function() {
    logLevel = 0;
    logger.debug('Hey');
    $httpBackend.expectPOST('https://student-mngmt-tool.herokuapp.com/api/log');
    $httpBackend.flush();
  });
  it('should test logger.info', function() {
    logger.info('Hey');
    $httpBackend.expectPOST('https://student-mngmt-tool.herokuapp.com/api/log');
    $httpBackend.flush();
  });
  it('should test logger.warn', function() {
    logger.warn('Hey');
    $httpBackend.expectPOST('https://student-mngmt-tool.herokuapp.com/api/log');
    $httpBackend.flush();
  });
  it('should test logger.error', function() {
    logger.error('Hey');
    $httpBackend.expectPOST('https://student-mngmt-tool.herokuapp.com/api/log');
    $httpBackend.flush();
  });
});
