const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EducationSchema = new Schema({
    degree: {
        type: String,
        required: true,
        trim: true
    },
    university: {
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

const Educations = mongoose.model.Educations || mongoose.model("Educations", EducationSchema)

module.exports = Educations;
