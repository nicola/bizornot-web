var mongoose = require('mongoose');
exports.MongoDB = mongoose.connect(process.env.MONGOHQ_URL || "mongodb://localhost/bizornot");