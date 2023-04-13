

const sourseFilePath = "./assets/cdw_ace23_buddies.json";

const responseMessages = {
    add:{
        success:"Added successfully!",
        readFailure:"Error while reading the file.",
        writeFailure:"Error while writing the file.",
        userExists:"The record with the employee Id you provided is alrady exists"

    },
    delete:{
        success:"The File Deleted Successfully..",
        readFailure:"Error while reading the file...",
        writeFailure:"Error while writing to file...",
        empNotExists:"The Employee Does Not Exist.."

    },
    getall:{
        readFailure:"Error while reading the file..."
    },
    getone:{
        readFailure:"Error while reading the file...",
        empNotExists:"The Employee Does Not Exist..."
    },
    update:{
        success:"The File Updated Successfully.",
        readFailure:"Error while reading the file...",
        writeFailure:"Error while writing to file...",
        empNotExists:"The Employee Does Not Exist..."
    }

}


module.exports = {
    responseMessages,
    sourseFilePath
}