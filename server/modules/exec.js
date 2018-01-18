/**
 * Created by kurpav on 5/6/15.
 */
var sys = require('sys'),
    exec = require('child_process').exec,
    child;

exports.execute = function (command, callback) {
    child = exec(command, function (error, stdout, stderr) {
        if (error !== null) {
            console.log('exec error: ' + error);
        }
        callback(stdout);
    });
};