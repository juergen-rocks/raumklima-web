var express = require('express');
var path = require('path');
var redis = require('redis');

var client = redis.createClient();
client.select(3);
client.on('error', function (err) {
    console.log('Error ' + err);
});

var keys = [];
for (var i = 1; i <= 8; i++) {
    keys.push('rs500_c' + i + '_temp');
    keys.push('rs500_c' + i + '_humi');
}


var app = express();

app.use('/static', express.static(path.join(__dirname, 'static')));

app.use('/data', function (request, response) {
    client.select(3, function () {
        client.mget(keys, function (err, res) {
            if (err) {
                response.statusCode = 500;
                var xErr = new Error(err);
                next(xErr);
                return;
            }
            var data = {};
            for (var i = 0; i <= 8; i++) {
                var index = i+1;
                var temp = res[2*i];
                var humi = res[2*i+1];
                data['c' + index + 't'] = temp !== null ? parseFloat(temp) : '--.-';
                data['c' + index + 'h'] = humi !== null ? parseInt(humi) : '--';
            }
            response.json(data);
        });
    });
});

app.use('/', function(req, res) {
    res.redirect('/static/index.html');
});

app.listen(8080, function () {
    console.log('App listening on port 8080!');
});
