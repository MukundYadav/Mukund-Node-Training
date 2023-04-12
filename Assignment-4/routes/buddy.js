let express = require('express');
let router = express.Router();
let fs =require('fs');

let getBuddyController = require("../controller/getBuddyController")
// getting buddies information.
router.get("/getAllBuddies", getBuddyController.getAllBuddies);

router.get("/getBuddy", getBuddyController.getBuddy);

// adding buddy....
let addBuddycontrol = require("../controller/addBuddyController");
router.post("/addBuddy" ,addBuddycontrol.addBuddy);

// updating Buddy's Information..
let updateBuddyControl = require("../controller/updateController")
router.put("/updateBuddy" , updateBuddyControl.updateBuddy )

// deleting the Buddy...
let deleteBuddyControl = require("../controller/deleteController");
router.delete("/deleteBuddy" ,deleteBuddyControl.deleteBuddy);

module.exports = router;
