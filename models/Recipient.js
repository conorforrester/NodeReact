//subdocument recipientSchema to be used in Survey Schema as an array
const mongoose = require('mongoose');
const { Schema } = mongoose;

const recipientSchema = new Schema({
    email: String,
    responded: { type: Boolean, default: false }
});

//since this is a subdocument, there is no model created with mongoose
//instead it is exported
module.exports = recipientSchema;