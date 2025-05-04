const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/crud');


const userSchema = mongoose.Schema({
        name: {type:String, required: true,  trim: true},
        email: {type: String, required: true, trim: true,  unique: true,},
        image: String
})

module.exports = mongoose.model("User", userSchema);