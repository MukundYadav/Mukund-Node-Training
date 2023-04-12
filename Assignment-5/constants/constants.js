const responseData = {
    add:{
        success:"Details added successfully!",
        failure:"The record with the employee ID you provided is already exist"
    },
    delete:{
        success:"Deleted a buddy successfully!",
        failure:"The record with the employee ID you provided was not found!"
    },
    get:{
        success:"The record with the employee ID you provided was found!",
        failure:"The record with the employee ID you provided was not found!"
    },
    getAll:{
        success:"The list of all buddies is foud and displayed"
    },
    update:{
        success:"Details updated successfully!",
        failure:"The record with the employee ID you provided was not found!"
    },
};

module.exports = {
    responseData
};