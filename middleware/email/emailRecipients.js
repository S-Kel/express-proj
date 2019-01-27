// Sends emails to WBGS and Host after expression of interest has been lodged
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

const emailRecipients = async (req, res, next) => {
    // destructure response
    const {
        email
    } = req.newUser;
    const {
        first_name,
        last_name,
        organisation,
        socials
    } = req.newHost;
    const {
        description,
        volunteers,
        target_value,
        location,
        best_time,
        local_council_relationship,
        local_council_details,
        key_influencers
    } = req.newEvent;

    // set up and render content of email to string to WBGS
    let WbgsMailOptions;
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
        WbgsMailOptions = {
            from: email,
            to: process.env.EMAIL_ADDRESS,
            subject: 'New expression of interest',
            html: content
        };
    });

    // send email to WBGS (async - wait for this to send before progressing)
    await sendMail('WBGS', WbgsMailOptions);

    // set up and render content of email to string to Host
    let HostMailOptions
    res.render('emailHost', {
        email,
        first_name,
        wbgs: "World's Biggest Garage Sale"
    }, (err, content) => {
        if (err) next(err);
        HostMailOptions = {
            from: process.env.EMAIL_ADDRESS,
            to: email,
            subject: 'Confirming your expression of interest in a WBGS event',
            html: content
        };
    });

    // send email to Host (async - wait for this to send before progressing)
    await sendMail('Host', HostMailOptions);

    // pass request to next middleware
    next();
};

module.exports = emailRecipients;