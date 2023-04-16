const { readFile, writeFileSync, existsSync } = require('fs');
const logger = require('../utils/loggers');
require("dotenv").config();

const auth = require('../utils/auth');
const taskServices  = require('../services/taskServices');

const validate = (data)  =>{
    if (!data.title || data.title.trim() == "" || !((/^[a-z\sA-Z]{1,15}$/).test(data.title))) {
        return false;
    }
    if (!data.description || data.description.trim() == "" || !((/^[a-z\sA-Z]{1,30}$/).test(data.description))) {
        return false;
    }
    if (!data.priority || !((/^[0-9]{1,5}$/).test(data.priority))) {
        return false;
    }
    if (!data.dueDate || data.dueDate.trim() == "" || !((/^[0-9]{2}-[0-9]{2}-[0-9]{4}$/).test(data.dueDate))) {
        return false;
    }
    if (!data.taskComments || !Array.isArray(data.taskComments)) {
        return false;
    }
    return true;
}

const addTask = (request, response) => {
    const authResponse = auth.verifyToken(request.headers.authorization);
    if(authResponse.status == 290) {
        try {
            if(!existsSync(`./assets/${authResponse.data.userName}_${authResponse.data.userId}_tasks.json`)) {
                writeFileSync(`./assets/${authResponse.data.userName}_${authResponse.data.userId}_tasks.json`, JSON.stringify([]));
            }
            try {
                readFile(`./assets/${authResponse.data.userName}_${authResponse.data.userId}_tasks.json`, async (err, data) => {
                    if (err) {
                        logger.error(`${err.status || 404} - ${"File was not found!"} - ${err.message}`);
                        response.status(404).json({
                            "status": 404,
                            "data": request.body,
                            "message": "File was not found!"
                        });
                    } else {
                        if(validate(request.body)) {
                            let index = -1;
                            const tasks = JSON.parse(data);
                            index = tasks.findIndex(task => task.taskId === request.body.taskId);
                            if(index !== -1) {
                                response.status(409).json({
                                    "status": 409,
                                    "data": request.body,
                                    "message": `Task with ID - ${request.body.taskId} already exists!`
                                });
                            }  else {
                                const addServiceResponse = taskServices.addTask(tasks, request.body, authResponse.data);
                                response.status(addServiceResponse.status).send(addServiceResponse);
                            }
                        } else {
                            response.status(409).json({
                                "status": 409,
                                "data": request.body,
                                "message": "Invalid data format!"
                            });
                        }
                    }
                });
            } catch (error) {
                logger.error(`${error.status || 404} - ${"File was not found!"} - ${error.message}`);
                response.status(404).json({
                    "status": 404,
                    "data": request.body,
                    "message": "File was not found!"
                });
            }
        } catch (error) {
            logger.error(`${error.status || 404} - ${"File was not found!"} - ${error.message}`);
            response.status(404).json({
                "status": 404,
                "data": request.body,
                "message": "File was not written!"
            });
        }
    } else {
        response.status(401).json({
            "status": 401,
            "message": "Unauthorized Access!"
        });
    }
}

const readTask = (request, response) => {
    const authResponse = auth.verifyToken(request.headers.authorization);
    if(authResponse.status == 290) {
        try {
            readFile(`./assets/${authResponse.data.userName}_${authResponse.data.userId}_tasks.json`, async (err, data) => {
                if (err) {
                    logger.error(`${err.status || 404} - ${"File was not found!"} - ${err.message}`);
                    response.status(404).json({
                        "status": 404,
                        "data": request.body,
                        "message": "File was not found!"
                    });
                } else {
                    const tasks = JSON.parse(data);
                    if(request.query.sort){
                        const sortResponse = taskServices.sortTask(tasks, request.query.sort);
                        response.status(sortResponse.status).send(sortResponse);
                    } else if(!(Object.keys(request.query) == 0)) {
                        const filterResponse = taskServices.filterTask(tasks, request.query);
                        response.status(filterResponse.status).send(filterResponse);
                    } else {
                        const readTaskReasponse = taskServices.readTask(tasks, authResponse.data);
                        response.status(readTaskReasponse.status).send(readTaskReasponse);
                    }
                }
            });
        } catch (error) {
            logger.error(`${error.status || 404} - ${"File was not found!"} - ${error.message}`);
            response.status(404).json({
                "status": 404,
                "data": request.body,
                "message": "File was not found!"
            });
        }
    } else {
        response.status(401).json({
            "status": 401,
            "message": "Unauthorized Access!"
        });
    }
}

const readSpecificTask = (request, response) => {
    const authResponse = auth.verifyToken(request.headers.authorization);
    if(authResponse.status == 290) {
        try {
            readFile(`./assets/${authResponse.data.userName}_${authResponse.data.userId}_tasks.json`, async (err, data) => {
                if (err) {
                    logger.error(`${err.status || 404} - ${"File was not found!"} - ${err.message}`);
                    response.status(404).json({
                        "status": 404,
                        "data": request.body,
                        "message": "File was not found!"
                    });
                } else {
                    const tasks = JSON.parse(data);
                    const readTaskReasponse = taskServices.readSpecificTask(tasks, request.params.taskId);
                    response.status(readTaskReasponse.status).send(readTaskReasponse);
                }
            });
        } catch (error) {
            logger.error(`${error.status || 404} - ${"File was not found!"} - ${error.message}`);
            response.status(404).json({
                "status": 404,
                "data": request.body,
                "message": "File was not found!"
            });
        }
    } else {
        response.status(401).json({
            "status": 401,
            "message": "Unauthorized Access!"
        });
    }
}

const deleteTask = (request, response) => {
    const authResponse = auth.verifyToken(request.headers.authorization);
    if(authResponse.status == 290) {
        try {
            readFile(`./assets/${authResponse.data.userName}_${authResponse.data.userId}_tasks.json`, async (err, data) => {
                if (err) {
                    logger.error(`${err.status || 404} - ${"File was not found!"} - ${err.message}`);
                    response.status(404).json({
                        "status": 404,
                        "data": request.body,
                        "message": "File was not found!"
                    });
                } else {
                    const tasks = JSON.parse(data);
                    const deleteTaskResponse = taskServices.deleteTask(tasks, request.params.taskId, authResponse.data);
                    response.status(deleteTaskResponse.status).send(deleteTaskResponse);
                }
            });
        } catch (error) {
            logger.error(`${error.status || 404} - ${"File was not found!"} - ${error.message}`);
            response.status(404).json({
                "status": 404,
                "data": request.body,
                "message": "File was not found!"
            });
        }
    } else {
        response.status(401).json({
            "status": 401,
            "message": "Unauthorized Access!"
        });
    }
}

const updateTask = (request, response) => {
    const authResponse = auth.verifyToken(request.headers.authorization);
    if(authResponse.status == 290) {
        try {
            readFile(`./assets/${authResponse.data.userName}_${authResponse.data.userId}_tasks.json`, async (err, data) => {
                if (err) {
                    logger.error(`${err.status || 404} - ${"File was not found!"} - ${err.message}`);
                    response.status(404).json({
                        "status": 404,
                        "data": request.body,
                        "message": "File was not found!"
                    });
                } else {
                    if(validate(request.body)) {
                        const tasks = JSON.parse(data);
                        const updateServiceResponse = taskServices.updateTask(tasks, request.params.taskId, request.body, authResponse.data);
                        response.status(updateServiceResponse.status).send(updateServiceResponse);
                    } else {
                        response.status(404).json({
                            "status": 404,
                            "data": request.body,
                            "message": "Invalid data format!"
                        });
                    }
                }
            });
        } catch (error) {
            logger.error(`${error.status || 404} - ${"File was not found!"} - ${error.message}`);
            response.status(404).json({
                "status": 404,
                "data": request.body,
                "message": "File was not found!"
            });
        }
    } else {
        response.status(401).json({
            "status": 401,
            "message": "Unauthorized Access!"
        });
    }
}


module.exports = {
    addTask,
    readTask,
    readSpecificTask,
    updateTask,
    deleteTask
}