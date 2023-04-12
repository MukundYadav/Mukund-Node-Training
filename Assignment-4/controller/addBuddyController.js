const addBuddyService = require("../services/addBuddyServices");

const addBuddy = async (request, response) => {
    response.send(await addBuddyService.addBuddy(request.body));
}
module.exports = {
    addBuddy
}
