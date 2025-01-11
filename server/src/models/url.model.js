const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const URLSchema = new Schema({
    linkedin: {
        type: String,
        default: null,
        validate: {
            validator: function(v) {
                return !v || /^https:\/\/(www\.)?linkedin\.com\/.+$/.test(v);
            },
            message: props => `${props.value} must be a valid LinkedIn URL!`
        }
    },
    github: {
        type: String,
        default: null,
        validate: {
            validator: function(v) {
                return !v || /^https:\/\/(www\.)?github\.com\/.+$/.test(v);
            },
            message: props => `${props.value} must be a valid GitHub URL!`
        }
    },
    instagram: {
        type: String,
        default: null,
        validate: {
            validator: function(v) {
                return !v || /^https:\/\/(www\.)?instagram\.com\/.+$/.test(v);
            },
            message: props => `${props.value} must be a valid Instagram URL!`
        }
    },
    custom_url: {
        type: String,
        default: null,
        validate: {
            validator: function(v) {
                return !v || /^https?:\/\/.+$/.test(v);
            },
            message: props => `${props.value} must be a valid URL!`
        }
    }
});

module.exports = URLSchema;
