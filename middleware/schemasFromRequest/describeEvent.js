// creates a new WBGS event from request data
const describeEvent = (EventWBGS) => (req, res, next) => {
    // destructure request body, request
    const {
        description,
        volunteers,
        target_value,
        location,
        best_time,
        local_council_relationship,
        local_council_details,
        key_influencers
    } = req.body;

    const { newHost } = req;

    // a new event should be created on all submissions
    const newEvent = new EventWBGS({
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

    // send created event to next middleware
    req.newEvent = newEvent;
    next();
};

module.exports = describeEvent;
