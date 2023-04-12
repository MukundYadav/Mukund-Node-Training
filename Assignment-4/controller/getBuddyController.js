const { reset } = require("nodemon");
const addBuddyService = require("../services/getBuddyServices");

const getAllBuddies = async (req,res) => {
    res.send( await addBuddyService.getAllBuddies(req.body));
}

const getBuddy = async (req,res) => {
    res.send( await addBuddyService.getBuddy(req.body));
}

module.exports = {
    getAllBuddies,
    getBuddy
}