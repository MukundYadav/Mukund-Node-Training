const { readFile, writeFile } = require('fs');
const fs = require('fs');
const { rejects } = require('assert');
const { resolve } = require('path');
const {responseMessages,sourseFilePath} = require('../constants/constants.js');

const addBuddy = async (body) => {
    let responseMessage;
    let promise = new Promise((resolve, reject) => {
        readFile(sourseFilePath, (err, data) => {
            if(err) {
                reject({
                    "status": 400,
                    "message": responseMessages.add.readFailure
                });
            } else {
                let index=-1;
                let buddyContents = JSON.parse(data);
                index = buddyContents.findIndex(buddy => buddy.employeeID === body.employeeID);
                if(index !==-1){
                    resolve({
                        "status": 400,
                        "message": responseMessages.add.userExists
                    });
                }
                else{
                buddyContents.push(body);
                writeFile(sourseFilePath, JSON.stringify(buddyContents), (err) => {
                    if(err) {
                        reject({
                            "status": 400,
                            "message": responseMessages.add.writeFailure
                        });
                    } else {
                        resolve({
                            "status": 200,
                            "message": responseMessages.add.success
                        });
                    }
                });
                }
            }
        });
    });
    await promise.then(
        (message) => {
            responseMessage = message;
        }
    );
    return responseMessage;
}

// delete buddy service..

const deleteBuddy = async (body) => {
    let responseMessage;
    let promise = new Promise ((resolve,reject) => {
            let data = JSON.parse(fs.readFileSync(sourseFilePath, (err) => {
                if(err){
                    reject({
                        "status": 400,
                        "message": responseMessages.delete.readFailure
                    });
                }
            }));
            let getID = body.employeeID;
            let index =-1;

            data.map((buddy) => {
                if(getID == buddy.employeeID){
                    index= 1;
                    data.splice(buddy,1);
                }
            });
            if(index == -1){
                resolve({
                    "status": 404,
                    "message": responseMessages.delete.empNotExists
                });
            }
            fs.writeFile(sourseFilePath, JSON.stringify(data),(err) =>{
                if(err){
                    reject({
                        "status": 400,
                        "message": responseMessages.delete.writeFailure
                    });
                }
            });
            resolve({
                "status": 200,
                "message": responseMessages.delete.success
            });
        });
await  promise.then (
    (message) => {
        responseMessage = message;
    }
);
return responseMessage;
}

// get buddy service....
const getAllBuddies = async (body) => {
    let responseMessage;
    let promise = new Promise((resolve,reject) => {
        fs.readFile(sourseFilePath, (err,data) => {  
            if(err){
                reject({
                    "status": 400,
                    "message": responseMessages.getall.readFailure
                });
            } 
            else{ 
                resolve({
                    "status": 200,
                    "message": JSON.parse(data)
                });
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
        let data = JSON.parse(fs.readFileSync(sourseFilePath, (err) => {
            if(err){
                reject({
                    "status": 400,
                    "message": responseMessages.getone.readFailure
                });
            }
        }));
        let getID = body.employeeID;
        flag=-1;
        data.map((buddy)=>{
            if(getID == buddy.employeeID){
                resolve({
                    "status": 200,
                    "message": buddy
                });
                flag=1;
            } 
        });
           
        if(flag==-1){
            resolve({
                "status": 404,
                "message": responseMessages.getone.empNotExists
            });
        }     
    });

    await promise.then (
        (message) => {
            responseMessage = message;
        }
    )
    return responseMessage;
}
 
// update buddy service.....
const updateBuddy = async (body, params) => {
    
    let responseMessage;
    let promise = new Promise ((resolve,reject) => {
        
        readFile(sourseFilePath, (err,data) => {
        
        if(err){
            reject({
                "status": 400,
                "message": responseMessages.update.readFailure
            });
        }
        
        else {
            let JsonData = JSON.parse(data);
            let getID = params.employeeID;
            let index =-1;
            JsonData.map((buddy)=>{
                if(getID == buddy.employeeID){
                    buddy.realName = body.realName;
                    buddy.nickName = body.nickName;
                    buddy.dob = body.dob;
                    buddy.hobbies = body.hobbies;
                    index= 1;
                }
            });
            
            if(index == -1){
                resolve({
                    "status": 404,
                    "message": responseMessages.update.empNotExists
                });
            }
        
            writeFile(sourseFilePath, JSON.stringify(JsonData),(err) =>{
                if(err)
                {
                    reject({
                        "status": 400,
                        "message": responseMessages.update.writeFailure
                    });
                } 
            });
            resolve({
                "status": 200,
                "message": responseMessages.update.success
            });
        }
    });
});
await promise.then(
    (message) => {
        responseMessage = message;
    }
);
return responseMessage;
}


module.exports = { 
    addBuddy,
    deleteBuddy,
    getAllBuddies,
    getBuddy,
    updateBuddy
};