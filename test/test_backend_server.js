'use strict';

var newApp = require('../backend/server');
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

describe('POST /api/register', function() {
  it('respond with 200', function(done) {
    var app = newApp(mockConnections.mockConnection);
    supertest(app)
      .post('/api/register')
      // .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
  });

  it('respond with 500', function(done) {
    var app = newApp(mockConnections.mockConnectionError);
    supertest(app)
      .post('/api/register')
      .expect(500)
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
  });
});
// app.post('/api/register', function(req, res) {
//   studentDataBase.registerNewUser(req.body, function(err, result) {
//     if (err) {
//       res.sendStatus(500);
//       return;
//     }
//     req.login({id: result.insertId}, function(error) {
//       if (error) {
//         logger.error(error);
//         return res.sendStatus(500);
//       }
//       res.sendStatus(200);
//     });
//   });
// });
