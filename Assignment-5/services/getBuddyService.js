const {responseData} = require('../constants/constants');
const listBuddy = (buddyContents, body) => {
    let status;
    let message;
    let index = -1;
    index = buddyContents.findIndex(buddy => buddy.employeeId === body.employeeId);
    if(index !== -1) {
        status = 300;
        message = responseData.get.success;
    } else {
        status = 404;
        message = responseData.get.failure;
    }
    return {
        "status": status,
        "data": buddyContents[index],
        "message": message
    };
}

const listAllBuddies = (buddyContents) => {
    let status = 300;
    let message = responseData.getAll.success;
    return {
        "status": status,
        "data": buddyContents,
        "message": message
    };
}

module.exports = { 
    listBuddy,
    listAllBuddies
};