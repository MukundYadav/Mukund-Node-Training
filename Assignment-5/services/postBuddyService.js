const { response } = require('express');
const { writeFileSync } = require('fs');
const {responseData} = require('../constants/constants');

const addBuddy = (buddyContents, body) => {
    let status;
    let message;
    let index = -1;
    index = buddyContents.findIndex(buddy => buddy.employeeId === body.employeeId);
    if(index !==-1){
         status = 404;
        message = responseData.add.failure ;
        return {
            "status": status,
            "message": message
        }
    }
    else{
        buddyContents.push(body);

        writeFileSync("./assets/cdw_ace23_buddies.json", JSON.stringify(buddyContents));
        
        status = 300;
        message = responseData.add.success;
        return {
            "status": status,
            "data": buddyContents,
            "message": message
        }
    }
    
}

module.exports = { addBuddy };