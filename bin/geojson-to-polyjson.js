#!/usr/bin/env node

var centroid = require('turf').centroid;
var envelope = require('turf').envelope;

function geojsonToPolyjson(geojson) {
    var middle = centroid(geojson).geometry.coordinates;
    var bbox = envelope(geojson).geometry.coordinates[0];
    var width = bbox[2][0] - bbox[0][0];
    var height = bbox[3][1] - bbox[1][1];

    if (geojson.type === 'MultiPolygon') {
        geojson.coordinates = geojson.coordinates.reduce(function(memo, multipolygon) {
            multipolygon.forEach(function(polygon) {
                memo.push(polygon);
            });
            return memo
        }, []);
    }

    var polyjson = geojson.coordinates.map(function(polygon) {
        return polygon.map(function(coords) {
            return [
                Math.round((coords[0] - middle[0])*10000/width),
                Math.round((coords[1] - middle[1])*10000/height)
            ];
        });
    });

    return polyjson;
}

if (require.main === module) {
    if (process.argv.length !== 4) {
        console.log('Error: wrong number of arguments');
        console.log('Usage:');
        console.log('  node ./bin/geojson-to-polyjson.js ./path/to/geojson/directory ./path/to/polyjson/directory');
        process.exit(1);
    }

    var fs = require('fs');
    var path = require('path');

    var directory = fs.readdirSync(path.resolve(process.argv[2]));
    directory.forEach(function(file) {
        var filepath = path.resolve(process.argv[2]) + '/' + file;
        var geojson = JSON.parse(fs.readFileSync(filepath).toString());

        var polyjson = geojsonToPolyjson(geojson);

        var destination = path.resolve(process.argv[3]) + '/' + file;
        fs.writeFileSync(destination, JSON.stringify(polyjson,null,2));
    });
}
