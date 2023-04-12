const express = require("express");
const router = express.Router();

const putBuddyController = require("../controllers/putBuddyController.js");
const deleteBuddyController = require("../controllers/deleteBuddyController");
const getBuddyController = require("../controllers/getBuddyController");
const postBuddyController = require("../controllers/postBuddyController");

router.post("/addBuddy", postBuddyController.addBuddy);

router.put("/updateBuddy", putBuddyController.updateBuddy);

router.delete("/deleteBuddy", deleteBuddyController.deleteBuddy);

router.get("/listBuddy", getBuddyController.listBuddy);

router.get("/listAllBuddies", getBuddyController.listAllBuddies);

module.exports = router;