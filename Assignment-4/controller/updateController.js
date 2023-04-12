const updateBuddyService = require("../services/updateBuddyServices");
const updateBuddy = async(req,res) => {
    console.log("hello");
    res.send(await updateBuddyService.updateBuddy(req.body));
}

module.exports = {
    updateBuddy
}