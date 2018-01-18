/**
 * Created by kurpav on 6/10/15.
 */
var fs = require('fs'),
    configurationFile = './config/config.json',
    mailsFile = './config/mails.json';

var config = JSON.parse(
    fs.readFileSync(configurationFile)
);

var mails = JSON.parse(
    fs.readFileSync(mailsFile)
);

module.exports.main = config;
module.exports.mails = mails;