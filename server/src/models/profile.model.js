const mongoose = require("mongoose");
const User = require("./user.model");
const URLSchema = require("./url.model");
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
    user: { 
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    name: {
        type: String,
        default: "Name"
    },
    surname: {
        type: String,
        default: "Surname"
    },
    photo: {
        type: String,
        default: null
    },
    email: {
        type: String,
        default: null
    },
    shortbio: {
        type: String,
        default: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque dolor ex, sagittis finibus viverra."
    },
    skills: {
        type: [Object],
        default: [],
    },
    about: {
        type: String,
        default: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In non urna eu velit dapibus euismod venenatis sit amet augue. Nunc in odio sit amet quam feugiat ultrices et sed neque. Curabitur accumsan viverra est et viverra. Ut egestas hendrerit eros, a volutpat eros maximus laoreet. Nunc vitae finibus tellus. Donec lobortis, erat nec efficitur lacinia, orci odio tempor ante, a vulputate nisi lectus at lorem. Fusce accumsan velit eget orci dictum faucibus. Nam a turpis non nunc imperdiet vestibulum.",
    },
    urls: {
        type: URLSchema,
        default: {}
    }
});

const Profile = mongoose.model.Profile || mongoose.model("Profile", ProfileSchema);

module.exports = Profile;