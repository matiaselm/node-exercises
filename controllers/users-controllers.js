const HttpError = require('../models/http-error');
const User = require('../models/user');
const mongoose = require('mongoose');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Created users are also currently added to the phonebook-part of the site, 
// that's why so much information is required
// Working
const createUser = async (req, res, next) => {
    console.log("POST request body: " + req.body);
    const { uid, name, email, password, address, postalnum, city, phonenum, bills } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new HttpError(
            'Invalid inputs passed', 422)
        );
    }

    let existingUser;
    let hashedPassword;

    try {
        hashedPassword = await bcrypt.hash(password, 12);
    } catch (e) {
        return next(new HttpError(
            'Could not create user', 500
        ));
    }

    const createdUser = new User({
        uid,
        name,
        email,
        password: hashedPassword,
        address,
        postalnum,
        city,
        phonenum,
        bills
    });

    try { // User.findOne needs to return false for both, email and uid. 
        // Both of those need to be unique for the new user 
        existingUser = await User.findOne({ $or: [{ email: email }, { uid: uid }] })

        // If the user with the uid or email doesn't exist -> This is expected
        if (!existingUser) {
            await createdUser.save();
        } else {
            return next(
                new HttpError('User already exists', 500)
            );
        }
    } catch (err) {
        return next(new HttpError(
            'Creating user failed, ' + err,
            500));
    }

    let token;
    try {
        token = jwt.sign({ uid: createdUser.uid },
            'good_key_lmao',
            { expiresIn: '1h' }
        );
    } catch (e) {
        return next(new HttpError(
            'Creating user failed', 500
        ));
    };

    // Return the token and all other wanted information to client
    res
        .status(201)
        .json({ token: token, uid: createdUser.uid, name: createdUser.name });
};

// Working
const login = async (req, res, next) => {
    console.log("User login");
    const { uid, password } = req.body;
    let existingUser;

    // Can the given uid be found
    try {
        existingUser = await User.findOne({ uid: uid })
    } catch (e) {
        return next(new HttpError(
            'UID mismatch', 422
        ));
    }

    // If userId can be found
    if (!existingUser) {
        return next(new HttpError(
            "User id and password don't match", 422
        ));
    }

    // Check if given password corresponds to the one in the db
    let isValidPassword = false;
    try {
        isValidPassword = await bcrypt.compare(password, existingUser.password)
    } catch (e) {
        return next(new HttpError(
            'Invalid credentials', 401
        ));
    }
    if (!isValidPassword) {
        return next(new HttpError(
            'Invalid credentials', 401
        ));
    }

    let token;
    try {
        token = jwt.sign({ uid: existingUser.uid },
            'good_key_lmao',
            { expiresIn: '1h' }
        );
    } catch (e) {
        return next(new HttpError(
            'loggin in failed', 500
        ));
    };

    res
        .status(201)
        .json({ token: token, uid: existingUser.uid, admin: existingUser.admin, name: existingUser.name });
};

// Working
// PATCH http://localhost:5000/api/users/5f3692771703665810da9693 <- _id
/*
 
BODY: 
{"address":"String",
"postalnum":"Integer",
"city":"String",
"phonenum":"Integer",
"bills":"Boolean",
"uid":"String",
"name":"String",
"email":"String",
"password":"String",
"admin":"Boolean"}
*/

const updateUserById = async (req, res, next) => {
    const { uid, name, email, password, address, postalnum, city, phonenum, bills, admin } = req.body;
    const userId = req.params._id;
    let user;

    try {
        user = await User.findById(userId);
    } catch (e) {
        const error = new HttpError(
            'Finding user failed', 500
        );
        return next(error);
    }

    let hashedPassword;

    try {
        hashedPassword = await bcrypt.hash(password, 12);
    } catch (e) {
        return next(new HttpError(
            'Could not hash password', 500
        ));
    }

    if (user) {
        user.uid = uid;
        user.name = name;
        user.email = email;
        user.password = hashedPassword;
        user.address = address;
        user.postalnum = postalnum;
        user.city = city;
        user.phonenum = phonenum;
        user.bills = bills;
        user.admin = admin;
        try {
            await user.save();
        } catch (e) {
            const error = new HttpError(
                'Updating user failed' + e, 500
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

// Working
// DELETE http://localhost:5000/api/users/5f36b6ea1703665810da9694 <- _id
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
    res.status(200).json({ message: 'Deleted user' });
};

// Working
// GET http://localhost:5000/api/users/
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
            'Could not find any users',
            404
        );
        return next(error);
    }
    res.json(users);
};

// Working:
// GET http://localhost:5000/api/users/5f36605fe8ccd11d80ccf164 <- _id
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
exports.login = login;
exports.updateUserById = updateUserById;
exports.deleteUserById = deleteUserById;