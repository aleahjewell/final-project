const mongoose = require('mongoose');
const express = require("express");
const router = express.Router();

const users = require("./users.js");
const User = users.model;
const validUser = users.valid;

const pets = require("./pets.js");
const Pet = pets.model;

const messageSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    pet: {
        type: mongoose.Schema.ObjectId,
        ref: 'Pet'
    },
    name: String,
    email: String,
    phone: String,
    message: String,
    date: {
        type: Date,
        default: Date.now,
    }
});

const Message = mongoose.model('Message', messageSchema);

// create message
router.post("/:id", validUser, async (req, res) => {
    try {
        let pet = await Pet.findOne({ _id: req.params.id }).populate('user');

        let message = new Message({
            user: pet.user,
            pet: pet,
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            message: req.body.message,
        });

        await message.save();
        return res.sendStatus(200);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
});

// get list of messages
router.get("/:id", validUser, async (req, res) => {
    try {
        let user = await User.findOne({ _id: req.params.id });

        let messages = await Message.find({
            user: user,
        }).sort({
            date: -1,
        }).populate('pet');
        return res.send(messages);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
});

// delete message
router.delete("/:id", validUser, async (req, res) => {
    try {
        let message = await Message.findOne({ _id: req.params.id });
        if (!message) {
            res.sendStatus(404);
            return;
        }

        await message.delete();
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
});

module.exports = {
    model: Message,
    routes: router,
}
