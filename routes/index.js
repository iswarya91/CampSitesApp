var express = require("express"),
   router = express.Router(),
   passport = require("passport"),
   User = require("../models/user");

router.get("/", function(req, res) {
    res.render("landing");
});


//AUTH ROUTES

//Register

router.get("/register", function(req, res){
    res.render("register");
})

router.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user) {
        if(err) {
            req.flash("error", err.message);
            res.redirect("back");
            console.log(err);
        } else {
            passport.authenticate("local")(req, res, function(){
                req.flash("success", "Welcome to YelpCamp!");
                res.redirect("/campgrounds");
            })
        }
    })
    
})

//Login

router.get("/login", function(req, res){
    res.render("login");
})

router.post("/login", passport.authenticate('local', {
        successRedirect:"/campgrounds",
        failureRedirect: "/login",
        failureFlash: true
}), function(req, res){
    req.flash("success", "Successfully logged in ...");
})

// Logout

router.get("/logout", function(req, res) {
    req.logout();
    req.flash("success", "Successfully logged out ...");
    res.redirect("/");
})

module.exports = router;
