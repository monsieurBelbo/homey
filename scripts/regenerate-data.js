'use strict';

var fs = require('fs'),
    path = require('path'),
    mongoose = require('mongoose'),
    config = require('../config/config'),
    mg = require('../config/lib/mongoose'),
    csv = require('fast-csv');

var file = 'properati-AR-2017-04-01-properties-sell.csv';


mg.loadModels();

mg.connect(function (db) {
    var Property = mongoose.model('Property');

    Property.remove({}, function() {
        var properties = [];
        var stream = fs.createReadStream(path.resolve('data', file))
            .pipe(csv.parse({headers: true}))
            .transform(function (row) {
                return {
                    location: {
                        type: 'Point',
                        coordinates: [parseFloat(row.lat), parseFloat(row.lon)]
                    },
                    source: {
                        name: 'Properati',
                        file: file,
                        raw: row
                    }
                };
            })
            .on('readable', function () {
                var row;
                while (null !== (row = stream.read())) {
                    var property = new Property(row);
                    property.save();
                }
            })
            .on('end', function () {

                process.exit;
            });
    });
});