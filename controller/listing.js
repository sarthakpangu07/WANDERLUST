const Listing = require("../models/listing.js"); 
const axios = require("axios");
module.exports.index=async(req,res)=>{
    const allListings = await Listing.find({});
    res.render("listings/index.ejs" , { allListings });
};

module.exports.renderNewform = (req,res)=>{
    res.render("listings/new.ejs");
};

module.exports.show = async(req,res)=>{
    let { id } = req.params;
    const listing = await Listing.findById(id).populate({path:"reviews",populate:{path:"author"},}).populate("owner");
    if(!listing){
       req.flash("error","The listing you requested does not exist"); 
       res.redirect("/listings");
    }
    console.log(listing);
    res.render("listings/show.ejs",{listing});
};

module.exports.createListing = async (req, res, next) => {
    try {
        let url = req.file.path;
        let filename = req.file.filename;

        const newListing = new Listing(req.body.listing);

        // Create full location string
        const searchLocation =
            `${newListing.location}, ${newListing.country}`;

        // Geocoding using Nominatim
        const response = await axios.get(
            "https://nominatim.openstreetmap.org/search",
            {
                params: {
                    q: searchLocation,
                    format: "json",
                    limit: 1,
                },
                headers: {
                    "User-Agent": "Wanderlust-Project",
                },
            }
        );

        // Store coordinates if location is found
        if (response.data.length > 0) {
            const place = response.data[0];

            newListing.geometry = {
                type: "Point",
                coordinates: [
                    parseFloat(place.lon),
                    parseFloat(place.lat),
                ],
            };
        } else {
            req.flash(
                "error",
                "Location not found. Please enter a valid location."
            );

            return res.redirect("/listings/new");
        }

        newListing.owner = req.user._id;
        newListing.image = { filename, url };

        await newListing.save();

        req.flash("success", "New Listing Created Successfully!");
        res.redirect("/listings");

    } catch (err) {
        console.log(err);

        req.flash(
            "error",
            "Unable to find the location. Please try again."
        );

        res.redirect("/listings/new");
    }
};

module.exports.editListing = async(req,res)=>{
        let { id } = req.params;
    const listing = await Listing.findById(id);
    if(!listing){
       req.flash("error","The listing you requested does not exist"); 
       res.redirect("/listings");
    }
    let originalImageURL = listing.image.url;
    originalImageURL = originalImageURL.replace("/upload","/upload/h_300/w_250");
    res.render("listings/edit.ejs",{listing,originalImageURL});
};

module.exports.updateListing = async(req,res)=>{
    if(!req.body.listing){
        throw new ExpressError(404,"Please enter a valid data");
    }
    let { id } = req.params;
    let listing = await Listing.findByIdAndUpdate(id,{...req.body.listing});
    if(typeof req.file != "undefined"){
        let filename = req.file.filename;
        let url = req.file.path;
        listing.image = { filename , url};
        await listing.save();
    }
    req.flash("success","Listing Updated");
    res.redirect(`/listings/${id}`);
};

module.exports.deleteListing = async(req,res)=>{
    let { id } = req.params;
    const deleteListing = await Listing.findByIdAndDelete(id);
    console.log(deleteListing);
    req.flash("success","Listing is Deleted");
    res.redirect("/listings");
};