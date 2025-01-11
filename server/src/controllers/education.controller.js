const Educations = require("../models/education.model");

const addEducation = async (data) => {
    try {
        const { degree, university, startEndDate } = data;

        const addedEducation = new Educations(
            {
                degree,
                university,
                startEndDate
            }
        );

        await addedEducation.save();

        if (!addedEducation) {
            throw Error("Education could not be added.");
        }

        return addedEducation;
    } catch (err) {
        throw err;
    }
}

const deleteEducation = async (data) => {
    try {
        const { id } = data;

        const deletedEducation = await Educations.findByIdAndDelete(id);

        if (!deletedEducation) {
            throw Error("Education not found!");
        }

        return deletedEducation;
    } catch (err) {
        throw err;
    }
}

module.exports = { addEducation, deleteEducation };