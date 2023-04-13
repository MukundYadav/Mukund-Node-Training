let express = require('express');
let router = express.Router();
let fs =require('fs');

let buddyController = require("../controller/buddyControllers")
// getting buddies information.
router.get("/", buddyController.getAllBuddies);

router.get("/:employeeID", buddyController.getBuddy);

// adding buddy....
router.post("/" ,buddyController.addBuddy);

// updating Buddy's Information..
router.put("/:employeeID" , buddyController.updateBuddy )

// deleting the Buddy...
router.delete("/:employeeID" ,buddyController.deleteBuddy);

module.exports = router;
