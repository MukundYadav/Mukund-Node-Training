const { writeFileSync } = require('fs');
const {responseData} = require('../constants/constants');

const updateBuddy = (buddyContents, body) => {
    let status;
    let message;let flag = true;
    for(buddy of buddyContents) {
        if(body.employeeId == buddy.employeeId) {
            buddy.nickname = body.nickname;
            buddy.Hobbies = body.Hobbies;
            flag = false;
        }
    }
    if(flag) {
        status = 404;
        message = responseData.update.failure;
    } else {
        writeFileSync("./assets/cdw_ace23_buddies.json", JSON.stringify(buddyContents));
        status = 300;
        message =responseData.update.success;
    }

    return {
        "status": status,
        "data": body,
        "message": message
    };
}

module.exports = { updateBuddy };