var express = require("express"),
   router = express.Router({mergeParams: true}),
   Campground = require("../models/campground"),
   Comment = require("../models/comment"),
   middleware = require("../middleware");

//NEW ROUTE
router.get("/new", middleware.isLoggedIn,  function(req, res) {
    Campground.findById(req.params.id, function(err, campground) {
        if (err) {
            req.flash("error", err.message);
            console.log(err);
        }
        else {
            res.render("comments/new", { campground: campground });
        }
    })

})

//CREATE ROUTE
router.post("/", middleware.isLoggedIn, function(req, res) {

    Campground.findById(req.params.id, function(err, campground) {
        if (err) {
            req.flash("error", err.message);
            console.log(err);
        }
        else {
            Comment.create(req.body.comment, function(err, comment) {
                if (err) {
                    req.flash("error", err.message);
                    console.log(err);
                }
                else {
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();
                    campground.comments.push(comment);
                    campground.save(function(err) {
                        if (err) {
                            req.flash("error", err.message);
                            console.log(err)
                        }
                        else {
                            res.redirect("/campgrounds/" + campground._id);
                        }
                    });
                }
            })
        }
    })

})

//EDIT
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res) {
    Comment.findById(req.params.comment_id, function(err, foundComment) {
        if(err) {
            req.flash("error", err.message);
            console.log(err);
        } else {
            res.render("comments/edit", {campground_id:req.params.id, comment: foundComment});
        }
    })
})

//UPDATE
router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
        if(err) {
            req.flash("error", err.message);
            console.log(err);
        } else {
           res.redirect("/campgrounds/" + req.params.id);   
        }
    })
})


//DELETE
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndDelete(req.params.comment_id, function(err) {
        if(err) {
            req.flash("error", err.message);
            console.log(err);
        } else {
            res.redirect("/campgrounds/" + req.params.id)
        }
    })
})



module.exports = router;