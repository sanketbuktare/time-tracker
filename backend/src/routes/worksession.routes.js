const express = require("express");
const router = express.Router();
const workController = require("../controllers/worksession.controller");

router.post("/start", workController.startWork);
router.post("/stop", workController.stopWork);
router.get("/task/:taskId", workController.listWorkByTask);

module.exports = router;
