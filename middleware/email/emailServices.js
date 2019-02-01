require('dotenv').config();
const sgMail = require('@sendgrid/mail'); const path = require('path');
const express = require('express');
const app = express();

// configure email settings
// --- connects to sendgrid SMTP API ---
sgMail.setApiKey(process.env.SENDGRID_API_KEY);


// view engine setup 
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');


// setup of email options; takes the following arguments: res (obj), next (obj), view to render (str), fields to pass into the view (obj), and mail options (obj)
const setupEmail = (res, next, view, viewFields, options) => {
    res.render(view, viewFields, (err, content) => {
        if (err) next(err);
        options.html = content;
    });
    return options;
};


// --- configures send email method ---
const sendMail = (content) => {
    sgMail.send(content, function (error) {
        if (error) console.log(error);
        console.log(`Email sent to ${content.to} \n`);
    });
};


// --- configures base email address for WBGS --- 
const WBGSEmail = process.env.EMAIL_ADDRESS;

module.exports = { setupEmail, sendMail, WBGSEmail };