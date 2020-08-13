const HttpError = require('../models/http-error');
const User = require('../models/user');

// const TESTUSERS = require('../testdb/test-users');

// console.log('TESTUSERS: ' + TESTUSERS)

const TESTUSERS = [
    {
        "id": 1,
        "name": "Matias Jalava",
        "address": "Siltakuja",
        "postalnum": 02770,
        "city": "Espoo",
        "phonenum": 050777777,
    },
    {
        "id": 2,
        "name": "Tuomas",
        "address": "Tapialantie",
        "postalnum": 14240,
        "city": "Janakkala",
        "phonenum": 050555555,
    },
    {
        "id": 3,
        "name": "Nelli",
        "address": "Carlanderintie",
        "postalnum": 04500,
        "city": "Kellokoski",
        "phonenum": 050666666,
    }];

const createUser = async (req, res, next) => {
    console.log("POST request body: " + req.body);
    const { name, address, postalnum, city, phonenum } = req.body;
    const createdUser = new User({
        name,
        address,
        postalnum,
        city,
        phonenum
    });

    try {
        await createdUser.save();
    } catch (err) {
        const error = new HttpError(
            'Creating user failed, please try again ',
            500
        );
        return next(error)
    }
    res
        .status(201)
        .json(createdUser)
};

const updateUserById = (req, res, next) => {
    const { pcs } = req.body;
    const userId = parseInt(req.params.id);

    const updatedUser = { ...TESTUSERS.find(p => p.id === userId) };

    const userIndex = TESTUSERS.findIndex(p => p.id === userId);
    updatedUser.pcs = pcs;

    TESTUSERS[userIndex] = updatedUser;

    res.status(200)
        .json({ user: updatedUser });
};

const deleteUserById = (req, res, next) => {
    const userId = parseInt(req.params.id);
    TESTUSERS = TESTUSERS.filter(p => p.id !== userId);
    console.log(TESTUSERS);
    res
        .status(200)
        .json({ message: 'Deleted user' });
};

const getAllUsers = (req, res, next) => {
    console.log('GET request in users' + TESTUSERS);
    res.json(TESTUSERS);
};

const getUserById = (req, res, next) => {
    const userid = parseInt(req.params.id);
    const user = TESTUSERS.find(p => {
        return p.id === userid;
    });

    // If the user requested doesn't exist
    if (!user) {
        return next(new HttpError('User with given id could not be found', 404))
    }
    res.json({ user });
};

exports.getAllUsers = getAllUsers;
exports.getUserById = getUserById;
exports.createUser = createUser;
exports.updateUserById = updateUserById;
exports.deleteUserById = deleteUserById;