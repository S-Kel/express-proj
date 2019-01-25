require('dotenv').config();
const sgMail = require('@sendgrid/mail');
const path = require('path');
const express = require('express');
const app = express();

// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

const emailWBGS = (req, res, next) => {
    // destructure response
    const {
        email
    } = req.newUser
    const {
        first_name,
        last_name,
        organisation,
        socials
    } = req.newHost
    const {
        description,
        volunteers,
        target_value,
        location,
        best_time,
        local_council_relationship,
        local_council_details,
        key_influencers
    } = req.newEvent

    // connect to sendgrid SMTP API
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    // set up and render content of email to string
    let mailOptions
    res.render('emailWBGS', {
        email,
        first_name,
        last_name,
        organisation,
        socials,
        description,
        volunteers,
        target_value,
        location,
        best_time,
        local_council_relationship,
        local_council_details,
        key_influencers
    }, (err, content) => {
        if (err) next(err);
        mailOptions = {
            from: email,
            to: process.env.EMAIL_ADDRESS,
            subject: 'New expression of interest',
            html: content
        };
    });

    // send email to WBGS
    sgMail.send(mailOptions, function (error) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent to WBGS' + '\n');
        }
    });

    // pass request to next middleware
    next();
};

module.exports = emailWBGS;