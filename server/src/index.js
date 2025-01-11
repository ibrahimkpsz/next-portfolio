const app = require("./app");
const { PORT } = process.env;

const startApp = () => {
    app.listen(PORT, () => {
        console.log(`Listening PORT: ${PORT}`);
    })
}

startApp();