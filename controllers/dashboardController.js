// defines controllers which transport data to/from dB for dashboard

const dashboardController = (EventWBGS) => {

    const getDashboard = (req, res, next) => {

        try {
            if (req.params.id) {
                // get event by id passed in on params
                EventWBGS.findById(req.params.id)
                    // handle query data
                    .exec((err, event) => {
                        // if error, handle error
                        if (err) return next(err);

                        // log success
                        console.log('Event document retrieved with id: ', event._id);

                        // send response of single event as json
                        res.json(event);
                    });

            } else {

                let { pageNum, limit } = req.query;
                pageNum = parseInt(pageNum);
                limit = parseInt(limit);

                // for all events
                EventWBGS
                    // where denied is not equal to true
                    .where('criteria.denied').ne(true)
                    // get count
                    .countDocuments()
                    // handle query
                    .exec((err, count) => {
                        // if error, handle error
                        if (err) return next(err);

                        // set up pagination variables
                        let startingDoc = !pageNum || pageNum < 0 ? 0 : (pageNum - 1) * limit; //defaults to 0
                        let itemsPerPage;
                        if (limit >= count) {
                            itemsPerPage = count;
                        } else if (!limit || limit <= 0) {
                            itemsPerPage = 10; // defaults to 10
                        };

                        // then, get all event data
                        EventWBGS.find()
                            // where denied is not equal to true
                            .where('criteria.denied').ne(true)
                            // filter out the event_id, organisation, full name, and created at fields
                            .select('_id host.organisation host.first_name host.last_name createdAt criteria.shortlisted')
                            // sort by created_at, with most recent at the top
                            .sort('-createdAt')
                            // filter by items per page, from a starting document
                            .skip(startingDoc).limit(itemsPerPage)
                            // handle query data
                            .exec((err, events) => {
                                // if error, handle error
                                if (err) return next(err);

                                // log success
                                console.log(`${events.length} of ${count} events retrieved from collection`);

                                // send response of all events as json
                                res.json({ data: events, count });
                            });
                    });
            };

        } catch (error) {
            return next(error);
        };
    };

    const updateDashboard = (req, res, next) => {
        // updates criteria model embedded in event model with data from the request body. These data include:
        // socials_check, description_check, volunteers_check, target_value_check, location_check, best_date_check, 
        // key_influencers_check, shortlisted, denied, denied_reason,
        try {

            // update event criteria with values sent on request body
            EventWBGS.findByIdAndUpdate(req.params.id, { criteria: req.body }, { new: true })
                // handle query data
                .exec((err, updatedEvent) => {
                    // if error, handle error
                    if (err) return next(err);

                    // log success
                    console.log('Criteria updated for Event document id: ', updatedEvent._id);

                    // if event has been denied, pass to denied email middleware with email and first name of host
                    if (updatedEvent.criteria.denied) {
                        req.body.email = updatedEvent.host.user.email;
                        req.body.first_name = updatedEvent.host.first_name;
                        return next();
                    };

                    // otherwise, respond with ok
                    res.status(200).send('content updated');
                });

        }
        catch (error) {
            return next(error);
        };
    };

    const getShortlist = (req, res, next) => {

        try {

            let { pageNum, limit } = req.query;
            pageNum = parseInt(pageNum);
            limit = parseInt(limit);

            // for all events on the shortlist
            EventWBGS
                // where denied is not equal to true
                .where('criteria.denied').ne(true)
                // where shortlist is true
                .where('criteria.shortlisted').equals(true)
                // get count
                .countDocuments()
                // handle query
                .exec((err, count) => {
                    // if error, handle error
                    if (err) return next(err);

                    // set up pagination variables
                    let startingDoc = !pageNum || pageNum < 0 ? 0 : (pageNum - 1) * limit; //defaults to 0
                    let itemsPerPage;
                    if (limit >= count) {
                        itemsPerPage = count;
                    } else if (!limit || limit <= 0) {
                        itemsPerPage = 10; // defaults to 10
                    };

                    // then, get all event data on the shortlist
                    EventWBGS.find()
                        // where denied is not equal to true
                        .where('criteria.denied').ne(true)
                        // where shortlist is true
                        .where('criteria.shortlisted').equals(true)
                        // filter out the event_id, organisation, full name, and created at fields
                        .select('_id host.organisation host.first_name host.last_name createdAt criteria.shortlisted')
                        // sort by created_at, with most recent at the top
                        .sort('-createdAt')
                        // filter by items per page, from a starting document
                        .skip(startingDoc).limit(itemsPerPage)
                        // handle query data
                        .exec((err, shortlist) => {
                            // if error, handle error
                            if (err) return next(err);

                            // log success
                            console.log(`${shortlist.length} of ${count} events retrieved from collection`);

                            // send response of all events as json
                            res.json({ data: shortlist, count });
                        });
                });

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