const Experience = require("../models/experience.model");

const addExperience = async (data) => {
    try {
        const { position, company, startEndDate } = data;

        const addedExperience = new Experience(
            {
                position,
                company,
                startEndDate
            }
        );

        await addedExperience.save();

        if (!addedExperience) {
            throw Error("Experience could not be added.");
        }

        return addedExperience;
    } catch (err) {
        throw err;
    }
}

const deleteExperience = async (data) => {
    try {
        const { id } = data;

        const deletedExperience = await Experience.findByIdAndDelete(id);

        if (!deletedExperience) {
            throw Error("Experience not found!");
        }

        return deletedExperience;
    } catch (err) {
        throw err;
    }
}

module.exports = { addExperience, deleteExperience };