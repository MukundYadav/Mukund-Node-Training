let http = require('http');
let express = require('express');
let app = express();
let port = 4001;
let fs = require('fs');

app.use(express.urlencoded({extended:false}));
app.use(express.json());

let buddyRoute = require("./routes/buddy");
app.use("/buddy", buddyRoute);

app.listen(port , () => {
    if(!fs.existsSync("./assets/cdw_ace23_buddies.json")){
        fs.writeFileSync("./assets/cdw_ace23_buddies.json",JSON.stringify([]));
    }
});