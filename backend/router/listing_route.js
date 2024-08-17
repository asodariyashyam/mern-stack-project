const express = require("express");
const router = express.Router();
const listingCtl = require("../controllers/listingCtl");
const { verifyToken } = require("../utils/verifyToken");

router.post("/create", listingCtl.createListing);

router.delete("/delete/:id", listingCtl.deleteListing);

router.post("/update/:id", listingCtl.updateListing);

router.get("/get/:id", listingCtl.getListing);

router.get("/get", listingCtl.getListings);

module.exports = router;
