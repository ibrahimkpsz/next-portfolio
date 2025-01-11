const jwt = require("jsonwebtoken");

const { TOKEN_KEY } = process.env;

const createToken = async (
    data,
    key = TOKEN_KEY,
    expiresIn = "7d"
) => {
    try {
        const token = await jwt.sign(data, key, { expiresIn });
        return token;
    } catch (err) {
        throw err;
    }
}

module.exports = { createToken };