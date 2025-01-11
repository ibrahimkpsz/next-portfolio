const jwt = require("jsonwebtoken");

const { TOKEN_KEY } = process.env;

const verifyToken = async (req, res, next) => {
    let token = req.headers["authorization"]?.replace("Bearer ", "");

    token = token || req.body.token || req.query.token || req.headers["x-access-token"];

    if (!token) {
        return res.status(403).send("An authentication token is required!");
    }

    try {
        const decodedToken = jwt.verify(token, TOKEN_KEY);
        req.currentUser = decodedToken;
    } catch (err) {
        return res.status(401).send("Invalid authentication token!")
    }

    return next();
}

module.exports = verifyToken;