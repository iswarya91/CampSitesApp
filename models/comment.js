var mongoose = require('mongoose');

var comment_Schema = new mongoose.Schema({
        text : String,
        author : {
            id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            },
            username: String
        }
});

module.exports = mongoose.model("Comment", comment_Schema);