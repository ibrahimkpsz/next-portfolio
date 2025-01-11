const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    token: String
});

const User = mongoose.model.User || mongoose.model("User", UserSchema);

module.exports = User;