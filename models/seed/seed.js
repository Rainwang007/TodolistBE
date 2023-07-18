require('dotenv').config('../../.env');
const mongoose = require('mongoose');
const userModel = require('../UserModel');
const bcrypt = require("bcrypt");

// import data to be seeded in db
const users = require('../users'); // -> array of test users to put into database

// make a connection to db
mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_HOST}/${process.env.MONGO_DB}?retryWrites=true&w=majority`)
    .then(async (res, req) => {
        console.log('seeding db');

        // insert into database using created model

        for (let user of users) {
            const hash = await bcrypt.hash(user.password, 10);

            // use user model to create a new user
            try {
                await userModel.create({
                    username: user.username,
                    email: user.email,
                    password: hash,
                    notifications: true,
                });
            } catch (err) {
                console.log(err);
                res.statusCode = 500;
                return res.json({
                    msg: "failed to create user"
                });
            }
        }



        mongoose.disconnect();
    })
    .catch(err => {
        console.log(err);
        console.log('failed to seed the data');
    });