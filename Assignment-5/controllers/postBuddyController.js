const postBuddyService = require("../services/postBuddyService");
const logger = require('../loggers/logger');
const { readFile } = require("fs");


const addBuddy = async (request, response) => {
    try {
        readFile("./assets/cdw_ace23_buddies.json", (err, data) => {
            if(err) {
                logger.error(`${err.status || 404} - ${"File was not found!"} - ${err.message}`);
                response.status(404).json({
                    "status": 404,
                    "data": request.body,
                    "message": "File was not found!"
                });
            } else {
                let buddyContents = JSON.parse(data);
                const result = postBuddyService.addBuddy(buddyContents, request.body);
                response.send(result);
            }
        });
    } catch (error) {
        logger.error(`${err.status || 404} - ${"File was not found!"} - ${err.message}`);
        response.status(404).json({
            "status": 404,
            "data": request.body,
            "message": "File was not found!"
        });
    }
}

module.exports = { addBuddy };