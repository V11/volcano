/**
 * Created by kurpav on 6/10/15.
 */
var nodemailer = require('nodemailer'),
    config = require('./config').main;

// create reusable transporter object using SMTP transport
var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: config.email.auth

});

module.exports.send = function (to, subject, body, callback) {
    // setup e-mail data with unicode symbols
    var mailOptions = {
        from: 'Volcano <volcano.khai@gmail.com>', // sender address
        to: to, // list of receivers
        subject: subject, // Subject line
        text: body // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, function (error, info) {
        if(callback) {
            callback(error, info);
        }
    });
};