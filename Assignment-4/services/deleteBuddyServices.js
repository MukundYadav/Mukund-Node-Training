const { rejects } = require('assert');
const fs = require('fs');
const { resolve } = require('path');


const deleteBuddy = async (body) => {
    let responseMessage;
    let promise = new Promise ((resolve,reject) => {
            let data = JSON.parse(fs.readFileSync("./assets/cdw_ace23_buddies.json", (err) => {
                if(err){
                    reject("Error while reading the file...");
                }
            }));
            let getID = body.employeeID;
            let index =-1;
            for(var i=0;i< data.length;i++) {
                if(getID == data[i].employeeID){
                    index= i;
                    data.splice(i,1);
                }
            }
            if(index == -1){
                resolve("The Employee Does Not Exist..")
            }
            fs.writeFile("./assets/cdw_ace23_buddies.json", JSON.stringify(data),(err) =>{
                if(err) throw err;
            });
            resolve("The File Deleted Successfully..")
        });
await  promise.then (
    (message) => {
        responseMessage = message;
    }
);
return responseMessage;
}
module.exports = {
    deleteBuddy
}
