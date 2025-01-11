const express = require("express");
const Profile = require("../models/profile.model");
const { authenticateUser, createNewUser, editProfile, editPhoto, upload } = require("../controllers/user.controller");
const verifyToken = require("../middlewares/auth");
const router = express.Router();

router.post("/", async (req, res) => {
    try {
        let { username, password } = req.body;
        username = username.trim();
        password = password.trim();

        if (!(username && password)) {
            throw Error("Email and password cannot be left blank.");
        }

        const authenticatedUser = await authenticateUser({ username, password });
        console.log(authenticatedUser);
        res.status(200).json(authenticatedUser);

    } catch (err) {
        res.status(400).send(err.message);
    }
});

router.get("/profile", async (req, res) => {
    try {
        const profile = await Profile.find();
        res.status(200).json(profile);
    } catch (err) {
        res.status(400).send(err.message)
    }
});

router.post("/edit-profile", verifyToken, async (req, res) => {
    try {
        const updatedProfile = await editProfile(req.body, req.currentUser.userId);
        res.status(200).json(updatedProfile);
    } catch (err) {
        res.status(400).send(err.message)
    }
});

router.post("/edit-photo", upload.single('photo'), verifyToken, async (req, res) => {
    try {
        const updatedPhoto = await editPhoto(req.file, req.currentUser.userId);
        res.status(200).json({ success: true, data: updatedPhoto });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
})

module.exports = router;