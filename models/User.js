const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    googleId: String
});

//create a new collection called users, with its corresponding schema
mongoose.model('users', userSchema);
