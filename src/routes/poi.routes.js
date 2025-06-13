const express = require("express");
const router = express.Router();
const PoiController = require("../controllers/poi.controller");

router.get("/", PoiController.getAllPoi);

module.exports = router;
