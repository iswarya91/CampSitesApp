var express = require('express'),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    Campground = require("./models/campground"),
    Comment = require("./models/comment"),
    User   = require("./models/user"),
    SeedDB = require("./seeds"),
    passport = require("passport"),
    LocalStategy =  require('passport-local'),
    expressSession = require('express-session'),
    methodOverride = require('method-override'),
    flash         = require('connect-flash');
    
// Importing routes
var indexRoute       = require("./routes/index"),
    campgroundRoute  = require("./routes/campground"),
    commentRoute     = require("./routes/comment");

var app = express();
//mongoose.connect("mongodb://localhost/yelp_camp", { useNewUrlParser: true });
mongoose.connect("mongodb://iswarya91:isaMAR1991@ds245512.mlab.com:45512/yelpcamp_db", { useNewUrlParser: true });
//SeedDB();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

app.use(expressSession({
    secret:"Great app",
    resave: false,
    saveUninitialized: false
}));


//Passport config
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(flash());

app.use(function(req, res, next){
	res.locals.currUser = req.user;
	res.locals.error   = req.flash("error");
	res.locals.success = req.flash("success");
	next();
});

app.use(methodOverride("_method"));

app.use("/", indexRoute);
app.use("/campgrounds", campgroundRoute);
app.use("/campgrounds/:id/comments", commentRoute);

app.set("view engine", "ejs");

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Started the YelpCamp Server");
});
