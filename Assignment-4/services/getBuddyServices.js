const { json } = require('express');
const fs = require('fs');
const { resolve } = require('path');


const getAllBuddies = async (body) => {
    let responseMessage;
    let promise = new Promise((resolve,reject) => {
        fs.readFile("./assets/cdw_ace23_buddies.json", (err,data) => {  
            if(err){
                reject("error while reading the file");
            } 
            else{ 
                resolve(JSON.parse(data));
            }
        });
    });
    await promise.then (
        (message) => {
            responseMessage = message;
        }
    )
    return responseMessage;
}

const getBuddy = async (body) => {
    let responseMessage;
    let promise = new Promise((resolve,reject) => {
        let data = JSON.parse(fs.readFileSync("./assets/cdw_ace23_buddies.json", (err) => {
            if(err){
                reject("Error while reading the file...");
            }
        }));
        let getID = body.employeeID;
        for(const element of data) {
            if(getID == element.employeeID){
                resolve(element);
            }
        }      
    });

    await promise.then (
        (message) => {
            responseMessage = message;
        }
    )
    return responseMessage;
}
 

module.exports = {
    getAllBuddies,
    getBuddy
}