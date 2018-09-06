var mongoose      = require("mongoose"),
    Campground    = require("./models/campground"),
    Comment       = require("./models/comment");

var data = [
    {
        name: "Cloud's Rest", 
        image: "https://farm9.staticflickr.com/8225/8524305204_43934a319d.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    },
    {
        name: "Desert Mesa", 
        image: "https://farm9.staticflickr.com/8422/7842069486_c61e4c6025.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    },
    {
        name: "Canyon Floor", 
        image: "https://farm9.staticflickr.com/8446/7826945736_9390741a5e.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    }
]

function seedDB() {
    // Remove all campgrounds
    Campground.remove({}, function(err) {
        if (err) {
            console.log(err);
        } else {
            console.log("Removed all campgrounds");
            /*
            data.forEach(function(campground) {
                Campground.create(campground, function(err, newCampground) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log("Added new campground");
                        Comment.create({
                            text: "Wish there was some internet and better facilities!!",
                            author: "Joker"
                        }, function(err, comment){
                            if(err) {
                                console.log(err);
                            } else {
                                newCampground.comments.push(comment);
                                newCampground.save();
                                console.log("Added a new Comment");
                            }
                            
                        })
                    }
                })
            })
            */
        }
    })
}

module.exports = seedDB;