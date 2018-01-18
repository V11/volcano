/**
 * Created by kurpav on 5/6/15.
 */
var exec = require('../modules/exec'),
    parseString = require('xml2js').parseString,
    configuration = require('../modules/config'),
    config = configuration.main,
    mails = configuration.mails,
    email = require('../modules/email'),
    command = require('../modules/command'),
    nmap = require('../parsers/nmap'),
    sqlmap = require('../parsers/sqlmap'),
    url = require('url'),
    ping = require('ping');


exports.register = function (server, options, next) {

    server.route([
        {
            method: 'POST',
            path: '/api/nmap',
            handler: function (request, reply) {
                var params = request.payload.data,
                    host = url.parse(params.target_url).hostname,
                    couchDb = request.server.plugins['hapi-couchdb'],
                    tpl = mails.nmap.replace('%url', params.target_url);

                ping.sys.probe(host, function (isAlive) {
                    if(isAlive) {

                        var commandStr = command.buildCommand(host, params.test_mode, config.nmap);

                        exec.execute(commandStr, function (result) {
                            parseString(result, function (err, result) {
                                var report = nmap.parse(result);
                                couchDb.Db.insert(report, function (err, body) {
                                    if (err) {
                                        console.log(err);
                                    }
                                });
                                email.send(params.report_email, 'Testing is done!', tpl + nmap.getReport(report));
                            });
                        });

                        reply('OK');
                    } else {
                        reply('The requested host doesn\'t exist!');
                    }
                });
            }
        },
        {
            method: 'POST',
            path: '/api/sqlmap',
            handler: function (request, reply) {
                var params = request.payload.data,
                    host = url.parse(params.target_url).hostname,
                    couchDb = request.server.plugins['hapi-couchdb'],
                    tpl = mails.sqlmap.replace('%url', params.target_url);

                ping.sys.probe(host, function (isAlive) {
                        if(isAlive) {

                            var commandStr = command.buildCommand(params.target_url, params.test_mode, config.sqlmap);

                            exec.execute(commandStr, function (result) {
                                var report = sqlmap.parse(params.target_url, commandStr);
                                couchDb.Db.insert(report, function (err, body) {
                                    if (err) {
                                        console.log(err);
                                    }
                                });
                                email.send(params.report_email, 'Testing is done!', tpl + report.body);
                            });

                            reply('OK');
                        } else {
                            reply('The requested host doesn\'t exist!');
                        }
                });
            }
        },
        {
            method: 'POST',
            path: '/api/feedback',
            handler: function (request, reply) {
                var params = request.payload.data,
                    tpl = mails.feedback.replace('%email', params.email);

                email.send(config.email.admin, 'A new feedback!', tpl + params.body);
                reply('OK');
            }
        }
    ]);

    // Callback, completes the registration process
    next();
};

// Required for all plugins
// If this were a npm module, one could do this:
// exports.register.attributes = require('package.json')
exports.register.attributes = {
    name: 'main-route', // Must be unique
    version: '1.0.0'
};