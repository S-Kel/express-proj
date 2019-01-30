// defines controllers which transport data to/from dB for dashboard

const dashboardController = (EventWBGS) => {

    const getDashboard = async (req, res, next) => {
        try {

            // Get all events
            const events = await EventWBGS.find();
            // filter out the event_id, organisation, full name, and created at fields
            let filteredFields = [];
            events.forEach(event => {
                const selection = {
                    event_id: event._id,
                    organisation: event.host.organisation,
                    name: `${event.host.first_name} ${event.host.last_name}`,
                    created_at: event.created_at
                };
                filteredFields.push(selection);
            });
            // sort on the results on created at, with most recent at the top
            filteredFields.sort((a, b) => b.created_at - a.created_at);
            // return the filtered fields as json
            res.json(filteredFields);

        } catch (error) {
            return next(error);
        };

    };

    return {
        getDashboard
    };
};

module.exports = dashboardController;