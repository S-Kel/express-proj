const express = require('express');
const { User } = require('../models/User');
const Event = require('../models/Event');
const router = express.Router();

router.post('/', async (req, res, next) => {
    try {
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
        } = req.body

        const newHost = new User({
            first_name,
            last_name,
            organisation,
            email,
            socials
        });

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
        await newHost.validate();
        await newEvent.validate();
        await newHost.save();
        await newEvent.save().then(() => {
            res.status(200);
            res.json(newEvent);
            // req.newEvent = newEvent;
            // return next();
        });

    } catch (error) {
        return next(error);
    };
});

module.exports = router;