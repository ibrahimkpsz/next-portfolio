require("./config/db");

const express = require("express");
const bodyParser = express.json;
const cors = require("cors");
const path = require("path");
const routes = require("./routes");

const app = express();

app.use(cors());

app.use(bodyParser());

app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
        console.error("Bad JSON");
        return res.status(400).json({ error: "Invalid JSON format" });
    }
    next();
})

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use("/api/v1", routes);

module.exports = app;