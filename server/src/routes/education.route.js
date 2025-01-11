const express = require("express");
const Educations = require("../models/education.model");
const { addEducation, deleteEducation } = require("../controllers/education.controller");
const verifyToken = require("../middlewares/auth");
const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const educations = await Educations.find();
        res.status(200).json(educations);
    } catch (err) {
        res.status(400).send(err.message);
    }
});

router.post("/add-education", verifyToken, async (req, res) => {
    try {
        const addedEducation = await addEducation(req.body);
        res.status(200).json(addedEducation);
    } catch (err) {
        res.status(400).send(err.message)
    }
});

router.post("/delete-education", verifyToken, async (req, res) => {
    try {
        const deletedEducation = await deleteEducation(req.body);
        res.status(200).json(deletedEducation);
    } catch (err) {
        res.status(400).send(err.message)
    }
});

module.exports = router;