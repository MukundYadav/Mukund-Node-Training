const express = require("express");
const fs = require("fs");
const expressApp = express();
const cors = require("cors");
require("dotenv").config();
const buddyRoute = require("./routes/buddy.routes.js");

expressApp.use(express.urlencoded( {extended: false} ));
expressApp.use(express.json());

expressApp.use(cors({
    origin: ["https://www.google.com"]
}));

expressApp.use("/buddy", buddyRoute);

expressApp.listen(process.env.PORT, () => {
    if(!fs.existsSync("./assets/cdw_ace23_buddies.json")) {
        fs.writeFileSync("./assets/cdw_ace23_buddies.json", JSON.stringify([]));
    }
});