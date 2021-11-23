/* eslint-disable no-undef */
const { expect } = require('chai');
const request = require('supertest');
const app = require('../server/app');

describe('testing tests', () => {
  it('should recognize mocha methods', () => {
    expect(1).to.equal(1);
    expect(1).to.not.equal(2);
  });
});

describe('testing server', () => {
  it('should get a response from server', () => request(app).get('/')
    .expect(200)
    .then((res) => {
      expect(res.statusCode).to.equal(200);
    }));

  it('should retrieve questions for an existing product', () => request(app).get('/qa/questions/?product_id=61575')
    .expect(200)
    .then((res) => {
      expect(res.body.productID).to.equal('61575');
    })
    .catch((e) => console.log(e)));

  it('should retrieve answers for an existing question', () => request(app).get('/qa/questions/216590/answers')
    .expect(200)
    .then((res) => {
      expect(res.body.length).to.be.above(0);
    })
    .catch((e) => console.log(e)));

  it('should return answers with a photos array', () => request(app).get('/qa/questions/216590/answers')
    .expect(200)
    .then((res) => {
      expect(res.body.length).to.be.above(0);
    })
    .catch((e) => console.log(e)));

  it('should return empty array for non-existent question', () => request(app).get('/qa/questions/31415155/answers')
    .expect(200)
    .then((res) => {
      expect(res.body).to.deep.equal([]);
    })
    .catch((e) => console.log(e)));
});
