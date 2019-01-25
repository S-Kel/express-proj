require('dotenv').config();
const sgMail = require('@sendgrid/mail');
const path = require('path');
const express = require('express');
const app = express();

// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

const emailHost = (req, res, next) => {
    // destructure response
    const {
        email
    } = req.newUser
    const {
        first_name,
    } = req.newHost

    // connect to sendgrid SMTP API
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    // set up and render content of email to string
    let mailOptions
    res.render('emailHost', {
        email,
        first_name,
        wbgs: "World's Biggest Garage Sale"
    }, (err, content) => {
        if (err) next(err);
        mailOptions = {
            from: process.env.EMAIL_ADDRESS,
            to: email,
            subject: 'Confirming your expression of interest in a WBGS event',
            html: content
        };
    });

    // send email to WBGS
    sgMail.send(mailOptions, function (error) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent to host' + '\n');
        }
    });

    // pass request to next middleware
    next();
};

module.exports = emailHost;