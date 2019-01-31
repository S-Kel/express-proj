// defines controllers which transport data to/from dB for dashboard

const dashboardController = (EventWBGS) => {

    const getDashboard = async (req, res, next) => {

        try {
            if (req.params.id) {
                // get event by id passed in on params
                const event = await EventWBGS.find({ _id: req.params.id });
                // send response of single event as json
                res.json(event);
            } else {
                // get all events
                const events = await EventWBGS.find()
                    // where denied is not equal to true
                    .where('criteria.denied').ne(true)
                    // filter out the event_id, organisation, full name, and created at fields
                    .select('_id host.organisation host.first_name host.last_name createdAt criteria.shortlisted')
                    // sort by created_at, with most recent at the top
                    .sort('-createdAt');
                // send response of all events as json
                res.json(events);
            };

        } catch (error) {
            return next(error);
        };
    };

    const updateDashboard = async (req, res, next) => {
        // updates criteria model embedded in event model with data from the request body. These data include:
        // socials_check, description_check, volunteers_check, target_value_check, location_check, best_date_check, 
        // key_influencers_check, shortlisted, denied, denied_reason,
        try {

            // get id of event to update from params
            const id = req.params.id;

            // update event criteria with values sent on request body
            await EventWBGS.findOneAndUpdate({ _id: id }, {
                criteria: req.body
            }).then((query) => {
                if (req.body.denied) {
                    req.body.email = query.host.user.email;
                    req.body.first_name = query.host.first_name;
                };
            });

            // if event has been denied, pass to denied email middleware
            if (req.body.denied) {
                return next();
            };

            // respond with ok
            res.status(200).send('content updated');
        }
        catch (error) {
            return next(error);
        };
    };

    const getShortlist = async (req, res, next) => {

        try {
            // get all events 
            const shortlist = await EventWBGS.find()
                // where denied is not equal to true
                .where('criteria.denied').ne(true)
                // where shortlist is true
                .where('criteria.shortlisted').equals(true)
                // filter out the event_id, organisation, full name, and created at fields
                .select('_id host.organisation host.first_name host.last_name createdAt criteria.shortlisted')
                // sort by created_at, with most recent at the top
                .sort('-createdAt');
            // send response of all events as json
            res.json(shortlist);
        }
        catch (error) {
            return next(error);
        };
    };

    return {
        getDashboard,
        updateDashboard,
        getShortlist
    };
};

module.exports = dashboardController;