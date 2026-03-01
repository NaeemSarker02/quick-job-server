const express = require("express");
const router = express.Router();
const { submitApplication } = require("../controllers/applicationController");
const { validateApplication } = require("../middleware/validate");

router.post("/", validateApplication, submitApplication);

module.exports = router;