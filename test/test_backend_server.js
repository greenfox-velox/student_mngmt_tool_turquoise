'use strict';

var newApp = require('../server');
var supertest = require('supertest');
var mockConnections = require('./mockconnections');

describe('GET /heartbeat', function() {
  it('respond with 200', function(done) {
    var app = newApp(mockConnections.mockConnection);
    supertest(app)
      .get('/heartbeat')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
  });

  it('respond with 500', function(done) {
    var app = newApp(mockConnections.mockConnectionError);
    supertest(app)
      .get('/heartbeat')
      .expect(500)
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
  });
});
0
describe('POST /api/log', function() {
  it('respond with 200', function(done) {
    var app = newApp(mockConnections.mockConnection);
    supertest(app)
    .post('/api/log')
    .expect(200)
    .end(function(err, res) {
      if (err) return done(err);
      done();
    });
  });
});
