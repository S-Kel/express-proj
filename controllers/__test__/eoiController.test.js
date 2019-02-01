const eoiController = require('../eoiController');

// set up variables to pass into all eoiController tests
const User = () => {
    this.save = () => { };
    this.validate = () => { };
};

const Host = () => {
    this.save = () => { };
    this.validate = () => { };
};

const EventWBGS = () => {
    this.save = () => { };
    this.validate = () => { };
};

test('calls next middleware after post', () => {
    // set up post variables
    const req = { body: {} };
    const res = {};
    const next = jest.fn(() => 'request passed to next middleware');

    // run function to be tested
    eoiController(User, Host, EventWBGS).post(req, res, next);

    // Define results expected from test
    expect(next).toBeCalled();
    expect(next).toHaveReturnedWith('request passed to next middleware');
});


