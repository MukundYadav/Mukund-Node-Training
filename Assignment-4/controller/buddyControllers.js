const buddyService = require("../services/buddyServices");

const addBuddy = async (request, response) => {
    const addResponse = await buddyService.addBuddy(request.body)
    response.status(addResponse.status).send(addResponse);
}

// delete buddy route

const deleteBuddy = async (req,res) => {
    const deleteResponse = await buddyService.deleteBuddy(req.params)
    res.status(deleteResponse.status).send(deleteResponse);
}

// get buddies routes

const getAllBuddies = async (req,res) => {
    const getAllResponse = await buddyService.getAllBuddies(req.body)
    res.status(getAllResponse.status).send(getAllResponse );
}
// get buddy route....
const getBuddy = async (req,res) => {
    const getResponse = await buddyService.getBuddy(req.params)
    res.status(getResponse.status).send(getResponse );
}

// update buddy route....
const updateBuddy = async(req,res) => {
    const updateResponse = await buddyService.updateBuddy(req.body, req.params)
    res.status(updateResponse.status).send(updateResponse);

}

module.exports = {
    addBuddy,
    deleteBuddy,
    getAllBuddies,
    getBuddy,
    updateBuddy
}
