const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        default: null
    },
    date: {
        from: { type: String },
        to: { type: String, default: null }
    },
    photo: {
        type: String,
        default: null
    },
    website: {
        type: String,
        default: null
    },
    github: {
        type: String,
        default: null
    }
}, {
    timestamps: true
});

const Project = mongoose.model.Project || mongoose.model("Project", ProjectSchema);

module.exports = Project;
