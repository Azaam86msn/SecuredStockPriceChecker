const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {

  // Viewing one stock
  test('Viewing one stock: GET request to /api/stock-prices', function(done) {
    chai.request(server)
      .get('/api/stock-prices')
      .query({ stock: 'GOOG' })
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.isObject(res.body.stockData);
        assert.property(res.body.stockData, 'stock');
        assert.property(res.body.stockData, 'price');
        assert.property(res.body.stockData, 'likes');
        assert.equal(res.body.stockData.stock, 'GOOG');
        done();
      });
  });

  // Viewing one stock and liking it
  test('Viewing one stock and liking it: GET request to /api/stock-prices', function(done) {
    chai.request(server)
      .get('/api/stock-prices')
      .query({ stock: 'GOOG', like: 'true' })
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.isObject(res.body.stockData);
        assert.property(res.body.stockData, 'stock');
        assert.property(res.body.stockData, 'price');
        assert.property(res.body.stockData, 'likes');
        assert.equal(res.body.stockData.stock, 'GOOG');
        assert.isNumber(res.body.stockData.likes);
        done();
      });
  });

  // Viewing the same stock and liking it again
  test('Viewing the same stock and liking it again: GET request to /api/stock-prices', function(done) {
    chai.request(server)
      .get('/api/stock-prices')
      .query({ stock: 'GOOG', like: 'true' })
      .end(function(err, res) {
        const initialLikes = res.body.stockData.likes;
        chai.request(server)
          .get('/api/stock-prices')
          .query({ stock: 'GOOG', like: 'true' })
          .end(function(err, res) {
            assert.equal(res.status, 200);
            assert.isObject(res.body.stockData);
            assert.equal(res.body.stockData.likes, initialLikes);
            done();
          });
      });
  });

  // Viewing two stocks
  test('Viewing two stocks: GET request to /api/stock-prices', function(done) {
    chai.request(server)
      .get('/api/stock-prices')
      .query({ stock: ['GOOG', 'AAPL'] })
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.isArray(res.body.stockData);
        assert.lengthOf(res.body.stockData, 2);
        res.body.stockData.forEach(stock => {
          assert.property(stock, 'stock');
          assert.property(stock, 'price');
          assert.property(stock, 'rel_likes');
        });
        done();
      });
  });

  // Viewing two stocks and liking them
  test('Viewing two stocks and liking them: GET request to /api/stock-prices', function(done) {
    chai.request(server)
      .get('/api/stock-prices')
      .query({ stock: ['GOOG', 'AAPL'], like: 'true' })
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.isArray(res.body.stockData);
        assert.lengthOf(res.body.stockData, 2);
        res.body.stockData.forEach(stock => {
          assert.property(stock, 'stock');
          assert.property(stock, 'price');
          assert.property(stock, 'rel_likes');
        });
        done();
      });
  });

});
