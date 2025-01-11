const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ExperienceSchema = new Schema({
    position: {
        type: String,
        required: true,
        trim: true
    },
    company: {
        type: String,
        required: true,
        trim: true
    },
    startEndDate: {
        from: { type: String, required: true },
        to: { type: String, default: null }
    }
}, {
    timestamps: true
});

const Experience = mongoose.model.Experience || mongoose.model("Experience", ExperienceSchema)

module.exports = Experience;
