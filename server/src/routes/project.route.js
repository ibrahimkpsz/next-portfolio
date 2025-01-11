const express = require("express");
const Project = require("../models/project.model");
const { addProject, deleteProject, upload } = require("../controllers/project.controller");
const verifyToken = require("../middlewares/auth");
const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const projects = await Project.find();
        res.status(200).json(projects);
    } catch (err) {
        res.status(400).send(err.message);
    }
});

router.post("/add-project", upload.single('photo'), verifyToken, async (req, res) => {
    try {
        const addedProject = await addProject(req.body, req.file);
        res.status(200).json({ success: true, data: addedProject });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
});

router.post("/delete-project", verifyToken, async (req, res) => {
    try {
        const deletedProject = await deleteProject(req.body);
        res.status(200).json(deletedProject);
    } catch (err) {
        res.status(400).send(err.message)
    }
});

module.exports = router;