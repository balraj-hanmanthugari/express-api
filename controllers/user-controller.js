const catchAsync = require('./../util/error-service').catchAsync;
const User = require('../models/user-model');
const crypto = require('crypto');
const fs = require('fs');
const https = require('https');

exports.getUsers = catchAsync(async function(req, res) {
    let start = Date.now();
    fs.readFile('config.env', 'utf8', () => {
        console.log('fs: ', Date.now()-start);
    });
    crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
        console.log('hash1: ', Date.now()-start);
    });
    crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
        console.log('hash2: ', Date.now()-start);
    });
    crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
        console.log('hash3: ', Date.now()-start);
    });
    crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
        console.log('hash4: ', Date.now()-start);
    });
    let users = await User.find().sort('-createdAt').select('-createdAt -__v');
    console.log("db: ", Date.now()-start);
    https.request('https://www.google.com', (res) => {
        res.on('data', () => {});
        res.on('end', () => {
            console.log('https: ', Date.now()-start);
        });
    }).end();
    res.status(200).json({
        status: 'success',
        results: users.length,
        data: {
            users: users
        }
    });
});

exports.createUser = catchAsync(async function(req, res) {
    let user = await new User(req.body).save();
    res.status(200).json({
        status: 'success',
        data: {
            user: user
        }
    });
});

exports.getUser = catchAsync(async function(req, res) {
    let user;
    if(req.params.id === "guide") {
        user = await User.find({
            role: req.params.id
        }).select('-createdAt -__v');
        console.log(user);
    } else {
        user = await User.findOne({
            emailId: req.params.id
        }).select('-createdAt -__v');
    }
    res.status(200).json({
        status: 'success',
        data: {
            user: user
        }
    });
});

exports.updateUser = catchAsync(async function(req, res) {
    let user = await User.findOneAndUpdate({
        emailId: req.params.id
    }, req.body);
    res.status(200).json({
        status: 'success',
        data: {
            user: user
        }
    });
});

exports.deleteUser = catchAsync(async function(req, res) {
    let user = await User.findByIdAndDelete(req.params.id);
    res.status(200).json({
        status: 'success',
        data: {
            user: user
        }
    });
});