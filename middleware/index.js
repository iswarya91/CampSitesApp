var Campground = require("../models/campground"),
    Comment   = require("../models/comment");

var middleware = {};
middleware.checkCampgroundOwnership = function (req, res, next) {
    if(req.isAuthenticated()){
        Campground.findById(req.params.id, function(err, foundCampground){
            if(err) {
                req.flash("error", err.message);
                res.redirect("back");
            } else {
                if(foundCampground.author.id.equals(req.user._id)) {
                    return next();
                } else {
                    req.flash("error", "You need to own the campground to perform that operation");
                    res.redirect("back");
                }
            }
        })
    } else {
        req.flash("error", "You need to be logged in to perform that operation");
        res.redirect("/login");
    }
}




middleware.checkCommentOwnership = function (req, res, next) {
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err) {
               req.flash("error", err.message);
               res.redirect("back");
            } else {
                if(foundComment.author.id.equals(req.user._id)) {
                    return next();
                } else {
                    req.flash("error", "You need to own the comment to perform that operation");
                    res.redirect("back");
                }
            }
        })
    } else {
        req.flash("error", "You need to be logged in to perform that operation");
        res.redirect("/login");
    }
}


middleware.isLoggedIn = function (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash("error", "You need to be logged in to perform that operation");
    res.redirect("/login");
}

module.exports = middleware;