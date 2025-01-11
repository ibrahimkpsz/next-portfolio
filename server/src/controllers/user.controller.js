const User = require("../models/user.model");
const { verifyHashedData } = require("../utils/verifyHashedData");
const { createToken } = require("../utils/createToken");
const Profile = require("../models/profile.model");
const multer = require("multer");
const path = require("path");

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

const authenticateUser = async (data) => {
    try {
        const { username, password } = data;

        if (!password || password.trim() === "") {
            throw Error("Password is required!");
        }

        const fetchedUser = await User.findOne({ username });

        if (!fetchedUser) {
            throw Error("Invalid username entered!");
        }

        const hashedPassword = fetchedUser.password;
        const passwordMatch = await verifyHashedData(password, hashedPassword);

        if (!passwordMatch) {
            throw Error("Invalid password entered!");
        }

        const tokenData = { userId: fetchedUser._id, username };
        const token = await createToken(tokenData);

        fetchedUser.token = token;

        return fetchedUser;
    } catch (err) {
        throw err;
    }
}

const editProfile = async (data, userId) => {
    try {
        const { name, surname, email, shortbio, about, skills, urls } = data;

        const updatedProfile = await Profile.findOneAndUpdate(
            { user: userId },
            {
                name,
                surname,
                email,
                shortbio,
                about,
                skills,
                urls
            },
            { new: true }
        );

        if (!updatedProfile) {
            throw Error("Profile not found!");
        }

        return updatedProfile;
    } catch (err) {
        throw err;
    }
}

const editPhoto = async (file, userId) => {
    try {
        const photo = file ? `/uploads/${path.basename(file.path)}` : null;
        const updatedPhoto = await Profile.findOneAndUpdate(
            { user: userId },
            {
                photo
            },
            { new: true }
        );
    
        if (!updatedPhoto) {
            throw Error("Profile not found!");
        }
    
        return updatedPhoto;
    } catch (err) {
        throw err;
    }
}

module.exports = { authenticateUser, editProfile, editPhoto, upload };