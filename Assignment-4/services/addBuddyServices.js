const { readFile, writeFile } = require('fs');

const addBuddy = async (body) => {
    let responseMessage;
    let promise = new Promise((resolve, reject) => {
        readFile("./assets/cdw_ace23_buddies.json", (err, data) => {
            if(err) {
                reject("Error while reading the file.");
            } else {
                let buddyContents = JSON.parse(data);
                buddyContents.push(body);
                writeFile("./assets/cdw_ace23_buddies.json", JSON.stringify(buddyContents), (err) => {
                    if(err) {
                        reject("Error while writing the file.");
                    } else {
                        resolve("Added successfully!");
                    }
                });
            }
        });
    });
    await promise.then(
        (message) => {
            responseMessage = message;
        }
    );
    return responseMessage;
}

module.exports = { addBuddy };