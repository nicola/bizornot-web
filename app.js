var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var request = require('request');


var app = express();

var Receipt = require('./models/receipt').model;

// view engine setup
app.set('views', path.join(__dirname, 'dist'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'dist')));

app.get('/', function(req, res) {
  res.render('index');
});

app.get('/receipts', function(req, res) {
  res.render('receipts');
});

app.get('/button', function(req, res) {
  res.render('button');
});

app.get('/paid', function(req, res) {

  var receipt1 = new Receipt({
    ReportID: "28F579E480AD4D89B6E6",
    ExpenseTypeCode: "BRKFT",
    PaymentTypeID: "nhR$p$py$p$sgJyq7J94gR9JakWJ5b7c",
    TransactionCurrencyCode: "USD",
    TransactionAmount: 120123,
    TransactionDate: (new Date()).toISOString().slice(0,10).replace(/-/g,"-"),
    VendorDescription: "Tea"
  });
  receipt1.save();


  var receipt2 = new Receipt({
    ReportID: "28F579E480AD4D89B6E6",
    ExpenseTypeCode: "BRKFT",
    PaymentTypeID: "nhR$p$py$p$sgJyq7J94gR9JakWJ5b7c",
    TransactionCurrencyCode: "USD",
    TransactionAmount: 120123,
    TransactionDate: (new Date()).toISOString().slice(0,10).replace(/-/g,"-"),
    VendorDescription: "Coffee"
  });
  receipt2.save();

  res.render('paid');
});

app.get('/addSomeReceipts', function(req, res) {

  var receipt1 = new Receipt({
    ReportID: "28F579E480AD4D89B6E6",
    ExpenseTypeCode: "BRKFT",
    PaymentTypeID: "nhR$p$py$p$sgJyq7J94gR9JakWJ5b7c",
    TransactionCurrencyCode: "USD",
    TransactionAmount: 120123,
    TransactionDate: (new Date()).toISOString().slice(0,10).replace(/-/g,"-"),
    VendorDescription: "Tea"
  });
  receipt1.save();


  var receipt2 = new Receipt({
    ReportID: "28F579E480AD4D89B6E6",
    ExpenseTypeCode: "BRKFT",
    PaymentTypeID: "nhR$p$py$p$sgJyq7J94gR9JakWJ5b7c",
    TransactionCurrencyCode: "USD",
    TransactionAmount: 120123,
    TransactionDate: (new Date()).toISOString().slice(0,10).replace(/-/g,"-"),
    VendorDescription: "Coffee"
  });
  receipt2.save();

  res.json({status:"OK"});
});

app.get('/api/v1/receipts', function(req, res) {

  Receipt.find({}).exec(function(err, receipts) {
    res.json({receipts:receipts});
  });

});

app.get('/test', function(req, res) {
  request.post({
    url:'https://www.concursolutions.com/api/v3.0/expense/entries',
    json: true,
    headers: {
        'Authorization': 'OAuth lhIICDzgMBQjFUP6Bfwf9jhfB7A='
    },
    ExpenseTypeCode: 'PBBLE',
    body: {
      _id: "bbbb",
      ReportID: "28F579E480AD4D89B6E6",
      ExpenseTypeCode: "BRKFT",
      PaymentTypeID: "nhR$p$py$p$sgJyq7J94gR9JakWJ5b7c",
      TransactionCurrencyCode: "USD",
      TransactionAmount: 120123,
      TransactionDate: (new Date()).toISOString().slice(0,10).replace(/-/g,"-"),
      VendorDescription: "HEYA2"
    }
  },
  function(err, response, body) {
    res.json(body);
  });
});

app.get('/api/v1/receipts/:id', function(req, res) {

  console.log("showing", req.params.id);

  Receipt.findById(req.params.id).exec(function(err, receipt) {
    if (err || !receipt) return res.json(500, {error:err, receipt: receipt});

    res.json(receipt);

  });

});

app.post('/api/v1/receipts/:id', function(req, res) {

  console.log("deleting", req.params.id);

  Receipt.findById(req.params.id).exec(function(err, receipt) {
    if (err || !receipt) return res.json(500, {error:err, receipt: receipt});

    if (req.body.answer) {
      request.post({
        url:'https://www.concursolutions.com/api/v3.0/expense/entries',
        json: true,
        headers: {
            'Authorization': 'OAuth lhIICDzgMBQjFUP6Bfwf9jhfB7A='
        },
        body: receipt
      },
      function(err, response, body) {
        res.json({status:"OK"});
      });
    } else {
      res.json({status:"OK"});
    }

    receipt.remove();

  });

});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('index', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('index', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
