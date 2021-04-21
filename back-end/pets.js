const mongoose = require('mongoose');
const express = require("express");
const router = express.Router();

// Configure multer so that it will upload to '/public/images'
const multer = require('multer')
const upload = multer({
    dest: '../front-end/public/images/',
    limits: {
        fileSize: 50000000
    }
});

const users = require("./users.js");
const User = users.model;
const validUser = users.valid;

const petSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    path: String,
    name: String,
    type: String,
    age: String,
    sex: String,
    breed: String,
    description: String,
    date: {
        type: Date,
        default: Date.now
    },
});

const Pet = mongoose.model('Pet', petSchema);

// upload pet
router.post("/", validUser, upload.single('photo'), async (req, res) => {
    if (!req.file) {
        return res.status(400).send({
            message: "Must upload a file.",
        });
    }

    const pet = new Pet({
        user: req.user,
        path: "/images/" + req.file.filename,
        name: req.body.name,
        type: req.body.type,
        age: req.body.age,
        sex: req.body.sex,
        breed: req.body.breed,
        description: req.body.description,
    });

    try {
        await pet.save();
        return res.sendStatus(200);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
});

// get all pets
router.get("/all", async (req, res) => {
    try {
        let pets = await Pet.find().sort({
            date: -1
        }).populate('user');
        return res.send(pets);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
});

// get my pets
router.get("/", validUser, async (req, res) => {
    try {
        let pets = await Pet.find({
            user: req.user
        }).sort({
            date: -1
        }).populate('user');
        return res.send(pets);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
});

// get pet 
router.get("/:id", async (req, res) => {
    try {
        let pet = await Pet.findOne({ _id: req.params.id }).populate('user');
        return res.send(pet);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
});

// edit pet
router.put("/:id", async (req, res) => {
    try {
        let pet = await Pet.findOne({ _id: req.params.id }).populate('user');
        pet.name = req.body.name;
        pet.type = req.body.type;
        pet.sex = req.body.sex;
        pet.age = req.body.age;
        pet.breed = req.body.breed;
        pet.descriptoin = req.body.description;
        await pet.save();
        return res.send(pet);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
});

// delete pet 
router.delete("/:id", async (req, res) => {
    try {
        let pet = await (await Pet.findOne({ _id: req.params.id })).populate('user');
        if (!pet) {
            res.sendStatus(404);
            return;
        }

        await pet.delete();
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
});

module.exports = {
    model: Pet,
    routes: router,
}
