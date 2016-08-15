var logger = require('../backend_logger');
var assert = require('assert');
var sinon = require('sinon');

var levelsOfLogging = logger().levelsOfLogging;

describe('Test logging with different logging level.', function() {
  it('Logging info when logging level is match(1)', function(done) {
    var mockConsole = sinon.spy();
    var mockLogger = logger(mockConsole, levelsOfLogging.info);
    mockLogger.info('test log text', 'date');
    assert.ok(mockConsole.calledWithMatch('date test log text'));
    done();
  });
  it('Logging info when logging level is lower than required', function(done) {
    var mockConsole = sinon.spy();
    var mockLogger = logger(mockConsole, levelsOfLogging.debug);
    mockLogger.info('test log text', 'date');
    assert.ok(mockConsole.calledWithMatch('date test log text'));
    done();
  });
  it('Logging error when logging level is match(3)', function(done) {
    var mockConsole = sinon.spy();
    var mockLogger = logger(mockConsole, levelsOfLogging.error);
    mockLogger.error('test log text', 'date');
    assert.ok(mockConsole.calledWithMatch('date test log text'));
    done();
  });
  it('Not logging info when logging level is higher than required (2)', function(done) {
    var mockConsole = sinon.spy();
    var mockLogger = logger(mockConsole, levelsOfLogging.error);
    mockLogger.info('test log text', 'date');
    assert.ok(mockConsole.notCalled);
    done();
  });
  it('Not logging warn when logging level is higher than required(3)', function(done) {
    var mockConsole = sinon.spy();
    var mockLogger = logger(mockConsole, levelsOfLogging.error);
    mockLogger.warn('test log text', 'date');
    assert.ok(mockConsole.notCalled);
    done();
  });
});
