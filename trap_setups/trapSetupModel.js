const { truncate } = require('fs');
var mongoose = require('mongoose');

// Setup schema
var trapSetupSchema = mongoose.Schema({
  island: {
    type: String,
    required: true
  },
  weapon: {
    type: String,
    required: true
  },
  base: {
    type: String,
    required: true
  },
  bait: {
    type: String,
    required: true
  },
  charm: {
    type: String,
    required: true
  }
});

// Export Trap Setup model
var TrapSetup = module.exports = mongoose.model('trapSetup', trapSetupSchema);

module.exports.get = function (callback, limit) {
  TrapSetup.find(callback).limit(limit);
}