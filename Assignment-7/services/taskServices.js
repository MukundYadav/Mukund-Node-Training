const { writeFileSync } = require('fs');
const { sortBy } = require('lodash');

const addTask = (taskData, body, authenticationData) => {
    taskData.push(body);
    writeFileSync(`./assets/${authenticationData.userName}_${authenticationData.userId}_tasks.json`, JSON.stringify(taskData));

    return  {
        "status": 201,
        "data": body, 
        "message": "Task added successfully!"
    };
}

const readTask = (taskData) => {
    return  {
        "status": 201,
        "data": taskData, 
        "message": "All tasks!"
    };
}

const filterTask = (taskData, query) => {
    const filteredTask = taskData.filter((task) => {
      let flag = true;
      for (key in query) {
        flag = flag && task[key] == query[key];
      }
      return flag;
    });
    if(filteredTask.length === 0) {
        return {
            "status": 404,
            "data": query, 
            "message": "No tasks were found!"
        }
    } else {
        return {
            "status": 201,
            "data": filteredTask, 
            "message": "Filtered tasks!"
        }
    }
}

const sortTask = (taskData, query) => {
    return {
        "status": 201,
        "data": sortBy(taskData, query), 
        "message": "Sorted tasks!"
    };
}

const readSpecificTask = (taskData, query) => {
    let index = -1;
    index = taskData.findIndex(tasks => tasks.taskId == query);
    if(index !== -1) {
        return {
            "status": 201,
            "data": taskData[index],
            "message": `Task with ID - ${query} was found!`
        };
    }  else {
        return {
            "status": 404,
            "data": query,
            "message": `Task with ID - ${query} was not found!`
        };
    }
}

const updateTask = (taskData, query, body, authenticationData) => {
    let flag = true;
    for(task of taskData) {
        if(query === task.taskId) {
            task.title = body.title;
            task.description = body.description;
            task.priority = body.priority;
            task.dueDate = body.dueDate;
            task.taskComments = body.taskComments;
            flag = false;
        }
    }
    if(flag) {
        return {
            "status": 404,
            "data": taskData,
            "message": `Task with ID - ${query} does not exist!`
        };
    }
    else {
        writeFileSync(`./assets/${authenticationData.userName}_${authenticationData.userId}_tasks.json`, JSON.stringify(taskData));
        return {
            "status": 201,
            "data": body,
            "message": `Task with ID - ${query} was updated!`
        };
    }
}

const deleteTask = (taskData, query, authenticationData) => {
    let flag = false;
    for(const task of taskData) {
        if(task.taskId == query) {
            taskData.splice(taskData.indexOf(task), 1);
            flag = true;
        }
    }
    if(flag) {
        writeFileSync(`./assets/${authenticationData.userName}_${authenticationData.userId}_tasks.json`, JSON.stringify(taskData));
        return {
            "status": 201,
            "data": query,
            "message": `Task with ID - ${query} was deleted!`
        };
    } else {
        return {
            "status": 404,
            "data": query,
            "message": `Task with ID - ${query} was not found!`
        };
    }
}

module.exports = {  
    addTask,
    readTask,
    readSpecificTask,
    updateTask,
    deleteTask,
    filterTask,
    sortTask
};