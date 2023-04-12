const {readFile,writeFile} = require('fs');

const updateBuddy = async (body) => {
    
    let responseMessage;
    let promise = new Promise ((resolve,reject) => {
        
        readFile("./assets/cdw_ace23_buddies.json", (err,data) => {
        
        if(err){
            
            reject("Error while reading the file...");
        }
        
        else {
            let JsonData = JSON.parse(data);
            let getID = body.employeeID;
            let index =-1;
            for(var i=0;i< JsonData.length;i++) {
                 if(getID == JsonData[i].employeeID){
                    index= i;
                    JsonData[i].realName = "sathish";
                }
            }
            
            if(index == -1){
            resolve("The Employee Does Not Exist..");
            }
        
            writeFile("./assets/cdw_ace23_buddies.json", JSON.stringify(JsonData),(err) =>{
                if(err)
                {
                    reject("Error while writing file");
                } 
            });
            resolve("The File Updated Successfully..")
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

module.exports = {
    updateBuddy
}