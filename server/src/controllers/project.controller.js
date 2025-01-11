const { ObjectId } = require('mongoose');
const multer = require('multer');
const path = require('path');
const Project = require("../models/project.model");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../uploads'));
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png/;
        const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = fileTypes.test(file.mimetype);

        if (extname && mimetype) {
            cb(null, true);
        } else {
            cb(new Error('Only JPEG, JPG and PNG format files are accepted.'));
        }
    }
});

const addProject = async (body, file) => {
    try {
        const { name, description, date, website, github } = body;
        const photo = file ? `/uploads/${path.basename(file.path)}` : null;

        const addedProject = new Project({
            name,
            description,
            date,
            photo,
            website,
            github
        });

        await addedProject.save();

        if (!addedProject) {
            throw new Error('Project could not be added!');
        }

        return addedProject;
    } catch (err) {
        throw err;
    }
};

const deleteProject = async (data) => {
    try {
        const { id } = data;

        const deletedProject = await Project.findByIdAndDelete(id);

        if (!deletedProject) {
            throw Error("Project not found!");
        }

        return deletedProject;
    } catch (err) {
        throw err;
    }
}

module.exports = { addProject, deleteProject, upload };