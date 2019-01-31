// Sends emails to Host after expression of interest has been denied by admin
require('dotenv').config();
const sgMail = require('@sendgrid/mail');
const path = require('path');
const express = require('express');
const app = express();

// configure email settings
// ----- connect to sendgrid SMTP API
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
// ----- configure sending email
const sendMail = (receiver, options) => {
    sgMail.send(options, function (error) {
        if (error) {
            console.log(error);
        } else {
            console.log(`Email sent to ${receiver} \n`);
        };
    });
};

// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

const deniedEmail = async (req, res, next) => {
    // destructure request
    const {
        body: {
            email,
            first_name,
            denied_reason
        }
    } = req;

    // set up and render content of email to string to Host
    let HostMailOptions
    res.render('denyHostEmail', {
        first_name,
        denied_reason,
        wbgs: "World's Biggest Garage Sale"
    }, (err, content) => {
        if (err) next(err);
        HostMailOptions = {
            from: process.env.EMAIL_ADDRESS,
            to: email,
            subject: 'Application for WBGS event denied',
            html: content
        };
    });

    // send email to Host (async - wait for this to send before progressing)
    await sendMail('Host', HostMailOptions);

    // pass request to next middleware
    next();
};

module.exports = deniedEmail;