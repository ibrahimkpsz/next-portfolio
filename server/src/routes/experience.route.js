const express = require("express");
const Experience = require("../models/experience.model");
const { addExperience, deleteExperience } = require("../controllers/experience.controller");
const verifyToken = require("../middlewares/auth");
const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const experiences = await Experience.find();
        res.status(200).json(experiences);
    } catch (err) {
        res.status(400).send(err.message);
    }
});

router.post("/add-experience", verifyToken, async (req, res) => {
    try {
        const addedExperience = await addExperience(req.body);
        res.status(200).json(addedExperience);
    } catch (err) {
        res.status(400).send(err.message)
    }
});

router.post("/delete-experience", verifyToken, async (req, res) => {
    try {
        const deletedExperience = await deleteExperience(req.body);
        res.status(200).json(deletedExperience);
    } catch (err) {
        res.status(400).send(err.message)
    }
});

module.exports = router;