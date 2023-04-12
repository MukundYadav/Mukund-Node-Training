const deleteBuddyService = require("../services/deleteBuddyServices")

const deleteBuddy = async (req,res) => {
    res.send( await deleteBuddyService.deleteBuddy(req.body));
}
module.exports = {
    deleteBuddy
}