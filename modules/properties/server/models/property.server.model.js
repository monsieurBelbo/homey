'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Property Schema
 */
var PropertySchema = new Schema({
  location: {
    type: { type: 'String', enum: ['Point'], default: 'Point' },
    coordinates: [Number]
  },
  source: {
    name: { type: 'String', enum: ['Properati'] },
    file: { type: 'String' },
    raw: Schema.Types.Mixed
  }
});

mongoose.model('Property', PropertySchema);
