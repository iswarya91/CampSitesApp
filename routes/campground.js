var express = require("express"),
   router = express.Router(),
   Campground = require("../models/campground"),
   middleware = require("../middleware");

//INDEX
router.get("/", function(req, res) {
    Campground.find({}, function(err, campgrounds) {
        if (err) {
            req.flash("error", err.message);
            console.log(err)
        }
        else {
            res.render("campgrounds/index", { campgrounds: campgrounds });
        }
    })

});

//CREATE
router.post("/", middleware.isLoggedIn, function(req, res) {
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var price = req.body.price;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var campground = { name: name, image: image, description: desc, author: author, price: price};

    Campground.create(campground, function(err, newCamground) {
        if (err) {
            req.flash("error", err.message);
            res.redirect("/campgrounds");
            console.log(err)
        }
        else {
            req.flash("success", "Successfully Added new campground " + newCamground.name);
            res.redirect("/campgrounds");
        }

    });

})

//NEW
router.get("/new", middleware.isLoggedIn, function(req, res) {
    res.render("campgrounds/new");
})

//SHOW
router.get("/:id", function(req, res) {
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground) {

        if (err) {
            req.flash("error", err.message);
            console.log(err);
        }
        else {
            res.render("campgrounds/show", { campground: foundCampground });
        }
    })
})


//EDIT
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res) {
    Campground.findById(req.params.id, function(err, foundCampground){
       if(err) {
           req.flash("error", err.message);
           res.redirect("/campgrounds/" + req.params.id);
           console.log(err);
       } else {
            res.render("campgrounds/edit", {campground: foundCampground});       
       }
    });
})

//UPDATE
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res) {
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground) {
        if(err) {
            req.flash("error", err.message);
            res.redirect("/campgrounds/" + req.params.id);
            console.log(err);
        } else {
            req.flash("success", "Successfully updated campground ");
            res.redirect("/campgrounds/" + req.params.id);
        }
    })
})

//DELETE
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findByIdAndRemove(req.params.id, function(err){
        if(err) {
            req.flash("error", err.message);
            res.redirect("/campgrounds");
            console.log(err);
        } else {
            req.flash("success", "Successfully deleted campground ");
            res.redirect("/campgrounds");
        }
    })
    
})

module.exports = router;