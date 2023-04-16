const App = express();
const { existsSync, writeFileSync } = require("fs");
require("dotenv").config();
const express = require("express");
const cors = require("cors");

const userRoutes = require('./routes/user.routes');
const taskRoutes = require('./routes/tasks.routes');
const auth = require('./utils/auth');

App.use(express.urlencoded( {extended: false} ));
App.use(express.json());

App.use(cors({
    origin: "*"
}));

App.use("/", (req, res) => {
    res.send("Base route!");
});

App.use('/users', userRoutes);

App.use('/tasks', taskRoutes);

App.post("/auth", auth.verifyToken, (req, res) => {
    res.send("User is valid");
});


App.listen(process.env.PORT, () => {
    console.log("Server started at port - "+process.env.PORT);
    if(!existsSync('./assets/users.json')) {
        writeFileSync("./assets/users.json", JSON.stringify([]));
    }
});

module.exports = App;