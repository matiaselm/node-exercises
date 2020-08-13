const HttpError = require('../models/http-error');
const User = require('../models/user');

const TESTUSERS = require('../testdb/test-user-with-bills');

// console.log('TESTUSERS: ' + TESTUSERS)

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

const updateUserById = async (req, res, next) => {
    const { name, address, postalnum, city, phonenum } = req.body;
    const userId = req.params._id;
    let user;

    try {
        user = await User.findById(userId);
    } catch (e) {
        const error = new HttpError(
            'Updating user failed', 500
        );
        return next(error);
    }
    if (user) {
        user.name = name;
        user.address = address;
        user.postalnum = postalnum;
        user.city = city;
        user.phonenum = phonenum;
        try {
            await user.save();
        } catch (e) {
            const error = new HttpError(
                'Updating user failed', 500
            );
            return next(error);
        }
    } else {
        const error = new HttpError(
            'Could not find that user', 404
        );
        return next(error);
    }

    res.json({ user: user.toObject({ getters: true }) });
};

const deleteUserById = async (req, res, next) => {
    const userId = req.params._id;
    let user;
    try {
        user = await User.findById(userId);
    } catch (e) {
        const error = new HttpError(
            'Deleting user failed', 500
        );
        return next(error);
    }
    if (user) {
        try {
            await user.remove();
        } catch (e) {
            const error = new HttpError(
                'Deleting user failed', 500
            );
            return next(error);
        }
    } else {
        const error = new HttpError(
            'Could not find user', 404
        );
        return next(error);
    }
    res.status(200).json({ message: 'Deleted order' });
};

const getAllUsers = async (req, res, next) => {
    let users;
    try {
        users = await User.find();
    } catch (e) {
        const error = new HttpError(
            'Cannot fetch all users', 500
        );
        return next(error);
    }

    if (!users || users.length === 0) {
        const error = new HttpError(
            'Could not find anu users',
            404
        );
        return next(error);
    }
    res.json(users);
};

const getUserById = async (req, res, next) => {
    const userid = req.params._id;
    let user;

    try {
        user = await User.findById(userid);
    } catch (e) {
        const error = new HttpError(
            'Cannot find an user',
            500
        );
        return next(error);
    }

    // If the user requested doesn't exist
    if (!user) {
        return next(new HttpError(
            'User with given id could not be found',
            404));
    }
    res.json({ user });
};

exports.getAllUsers = getAllUsers;
exports.getUserById = getUserById;
exports.createUser = createUser;
exports.updateUserById = updateUserById;
exports.deleteUserById = deleteUserById;