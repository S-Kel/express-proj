// Sends emails to WBGS and Host after expression of interest has been lodged
const { setupEmail, sendMail, WBGSEmail } = require('./emailServices');

const eoiEmail = async (req, res, next) => {
    // destructure request
    const {
        body: {
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
        }
    } = req;

    // fields to render to email WBGS view
    const wbgsViewFields = {
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
    };

    const wbgsMailOptions = {
        from: email,
        to: WBGSEmail,
        subject: 'New expression of interest'
    };

    // set up and render content of eoi email to WBGS to string
    const wbgsMailContent = setupEmail(res, next, 'emailWBGS', wbgsViewFields, wbgsMailOptions);

    // fields to render to emailHost view
    const hostViewFields = {
        first_name,
        wbgs: "World's Biggest Garage Sale"
    };

    const hostMailOptions = {
        from: WBGSEmail,
        to: email,
        subject: 'Confirming your expression of interest in a WBGS event'
    };

    // set up and render content of eoi email to Host to string
    const hostMailContent = setupEmail(res, next, 'emailHost', hostViewFields, hostMailOptions);

    // send email to WBGS (async - wait for this to send before progressing)
    await sendMail(wbgsMailContent);

    // send email to Host (async - wait for this to send before progressing)
    await sendMail(hostMailContent);

    // pass request to next middleware
    next();
};

module.exports = eoiEmail;