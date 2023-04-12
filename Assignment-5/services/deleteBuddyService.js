const { writeFileSync } = require('fs');
const {responseData} = require('../constants/constants');
const deleteBuddy = (buddyContents, body) => {
    let status;
    let message;
    let index = -1;
    index = buddyContents.findIndex(buddy => buddy.employeeId === body.employeeId);
    if(index !== -1) {
        buddyContents.splice(index, 1);
        writeFileSync("./assets/cdw_ace23_buddies.json", JSON.stringify(buddyContents));
        status = 300;
        message = responseData.delete.success;
    } else {
        status = 404;
        message = responseData.delete.failure;
    }
    
    return {
        "status": status,
        "data": body,
        "message": message
    };
}

module.exports = { deleteBuddy };