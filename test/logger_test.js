var logger = require('../logger');
var assert = require('assert');
var sinon = require('sinon');

describe('Test logging with different logging level.', function() {
  it('Logging info when logging level is match(1)', function(done) {
    var mockConsole = sinon.spy();
    var mockLogger = logger(mockConsole, 1);
    mockLogger.info('test log text', 'Thu Aug 11 2016 14:46:57 GMT+0200 (CEST)');
    assert.ok(mockConsole.calledWithMatch('Thu Aug 11 2016 14:46:57 GMT+0200 (CEST) test log text'));
    done();
  });
  it('Logging info when logging level is lower than required', function(done) {
    var mockConsole = sinon.spy();
    var mockLogger = logger(mockConsole, 0);
    mockLogger.info('test log text', 'Thu Aug 11 2016 14:46:57 GMT+0200 (CEST)');
    assert.ok(mockConsole.calledWithMatch('Thu Aug 11 2016 14:46:57 GMT+0200 (CEST) test log text'));
    done();
  });
  it('Logging error when logging level is match(3)', function(done) {
    var mockConsole = sinon.spy();
    var mockLogger = logger(mockConsole, 3);
    mockLogger.error('test log text', 'Thu Aug 11 2016 14:46:57 GMT+0200 (CEST)');
    assert.ok(mockConsole.calledWithMatch('Thu Aug 11 2016 14:46:57 GMT+0200 (CEST) test log text'));
    done();
  });
  it('Not logging info when logging level is higher than required (2)', function(done) {
    var mockConsole = sinon.spy();
    var mockLogger = logger(mockConsole, 3);
    mockLogger.info('test log text', 'Thu Aug 11 2016 14:46:57 GMT+0200 (CEST)');
    assert.ok(mockConsole.notCalled);
    done();
  });
  it('Not logging warn when logging level is higher than required(3)', function(done) {
    var mockConsole = sinon.spy();
    var mockLogger = logger(mockConsole, 3);
    mockLogger.warn('test log text', 'Thu Aug 11 2016 14:46:57 GMT+0200 (CEST)');
    assert.ok(mockConsole.notCalled);
    done();
  });
});

describe('Test date input.', function() {
  it('Date match', function(done) {
    var mockConsole = sinon.spy();
    var mockLogger = logger(mockConsole, 1);
    var mockDate = new Date();
    mockLogger.info('test log text', mockDate);
    assert.ok(mockConsole.calledWithMatch(mockDate + ' ' + 'test log text'));
    done();
  });
});
