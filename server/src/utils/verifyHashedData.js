const bcyrpt = require("bcrypt");

const verifyHashedData = async (unhashed, hashed) => {
    try {
        const match = await bcyrpt.compare(unhashed, hashed);
        return match;
    } catch (err) {
        throw err;
    }
}

module.exports = { verifyHashedData };