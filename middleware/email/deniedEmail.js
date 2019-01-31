// Sends emails to Host after expression of interest has been denied by admin
const { setupEmail, sendMail, WBGSEmail } = require('./emailServices');

const deniedEmail = async (req, res, next) => {
    // destructure request
    const {
        body: {
            email,
            first_name,
            denied_reason
        }
    } = req;

    // fields to render to email denyHostEmail view
    const deniedViewFields = {
        first_name,
        denied_reason,
        wbgs: "World's Biggest Garage Sale"
    };

    const deniedMailOptions = {
        from: WBGSEmail,
        to: email,
        subject: 'Application for WBGS event denied'
    };

    // set up and render content of eoi email to denied Host to string
    const deniedMailContent = setupEmail(res, next, 'denyHostEmail', deniedViewFields, deniedMailOptions);

    // send email to Host (async - wait for this to send before progressing)
    await sendMail(deniedMailContent);

    // pass request to next middleware
    next();
};

module.exports = deniedEmail;