const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js"); 
const { isLoggedIn , isOwner ,validatelisting } = require("../middleware.js");
const listingController= require("../controller/listing.js");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload =  multer({storage});

router.route("/")
    .get(wrapAsync(listingController.index))
    .post(isLoggedIn,validatelisting,upload.single("listing[image][url]"),wrapAsync(listingController.createListing));
    

router.get("/new",isLoggedIn,listingController.renderNewform);

router.route("/:id")
    .get(wrapAsync(listingController.show))
    .put(isLoggedIn,isOwner,validatelisting,upload.single("listing[image][url]"),wrapAsync(listingController.updateListing))
    .delete(isLoggedIn,isOwner,wrapAsync(listingController.deleteListing));



router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(listingController.editListing));

module.exports = router;
