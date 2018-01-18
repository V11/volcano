/**
 * Created by kurpav on 6/11/15.
 */
var fs = require('fs'),
    url = require('url'),
    rmdir = require('rimraf');

var getDomain = function (addr) {
    return url.parse(addr).hostname;
};

module.exports.parse = function(targetUrl, command) {
    var name = getDomain(targetUrl),
        content = fs.readFileSync('./sqlmap/out/' + name + '/log', 'utf8');

    rmdir('./sqlmap/out/' + name, function(err) {
        if(err) {
            console.log(err);
        }
    });
    return {
        hostname: name,
        command: command,
        body: content === ''? 'There are no vulnerabilities! :)' : content,
        startDate: new Date().toString()
    };
};