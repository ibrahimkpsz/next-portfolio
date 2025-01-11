const User = require("../models/user.model");
const Profile = require("../models/profile.model");
const { hashData } =  require("./hashData");

const createAdminAccount = async () => {
    try {
        const existingUser = await User.findOne({});
        if (existingUser) {
            console.log("Admin account already exists.");
            return;
        }

        const username = process.env.ADMIN_USERNAME || "admin";
        const defaultPassword = process.env.ADMIN_PASSWORD;

        if (!defaultPassword) {
            throw new Error("Admin password is not set. Please define ADMIN_PASSWORD in environment variables.");
        }

        const hashedPassword = await hashData(defaultPassword);
        const adminUser = new User({
            username,
            password: hashedPassword,
        });
        await adminUser.save();

        const newProfile = new Profile({
            user: adminUser._id
        });
        await newProfile.save();

        console.log(`Admin account created successfully with username: ${username}`);
    } catch (error) {
        console.error("Error seeding admin user:", error.message);
    }
};

module.exports = { createAdminAccount }