const express = require('express');
const router = express.Router();

const { User } = require('../models/User');
const { Host } = require('../models/Host');
const Event = require('../models/Event');


router.post('/', async (req, res, next) => {
    try {

        // destructure request body
        const {
            first_name,
            last_name,
            organisation,
            email,
            socials,
            description,
            volunteers,
            target_value,
            location,
            best_time,
            local_council_relationship,
            local_council_details,
            key_influencers
        } = req.body;

        // for new host/user, new user is created
        const newUser = new User({
            email
        });

        // for new host/user, new host is created
        const newHost = new Host({
            user: newUser,
            first_name,
            last_name,
            organisation,
            socials
        });

        // a new event should be created on all submissions
        const newEvent = new Event({
            host: newHost,
            description,
            volunteers,
            target_value,
            location,
            best_time,
            local_council_relationship,
            local_council_details,
            key_influencers
        });

        // validate data for both entries befor saving to DB
        await newUser.validate();
        await newHost.validate();
        await newEvent.validate();
        await newUser.save();
        await newHost.save();
        await newEvent.save();

        // Attach new event and then send to next middleware
        res.status(200);
        res.json(newEvent);
        // req.newEvent = newEvent; // Use this when ready to pass onto email handler
        // return next();

    } catch (error) {
        return next(error);
    };
});

module.exports = router;