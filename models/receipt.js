var db = require('../classes/store').MongoDB;
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
  ReportID: { type: String, required: true },
  ExpenseTypeCode: { type: String, required: true },
  PaymentTypeID: { type: String, required: true },
  TransactionCurrencyCode: { type: String, required: true },
  TransactionAmount: { type: String, required: true },
  TransactionDate: { type: String, required: true },
  VendorDescription: { type: String, required: true },
});

mongoose.model("Receipt", schema);

module.exports = {
  model: db.model("Receipt")
};