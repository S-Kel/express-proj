// defines controllers which transport data to/from dB for dashboard

const dashboardController = (EventWBGS) => {

    const getDashboard = async (req, res, next) => {
        try {

            // Get all events
            const events = await EventWBGS.find()
                // filter out the event_id, organisation, full name, and created at fields
                .select('_id host.organisation host.first_name host.last_name created_at')
                // sort by created_at, with most recent at the top
                .sort('-created_at');
            // res.json(filteredFields);
            res.json(events);

        } catch (error) {
            return next(error);
        };

    };

    return {
        getDashboard
    };
};

module.exports = dashboardController;