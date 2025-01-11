const express = require("express");
const router = express.Router();

const userRoutes = require("./user.route");
const experienceRoutes = require("./experience.route");
const educationRoutes = require("./education.route");
const projectRoutes = require("./project.route");

router.use("/user", userRoutes);
router.use("/experiences", experienceRoutes);
router.use("/educations", educationRoutes);
router.use("/projects", projectRoutes);

module.exports = router;