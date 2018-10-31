const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// create schema
const IdeaSchema = new Schema({
    title:{
        type: String,
        required : true
    },
    details :{
        type : String,
        required : true
    },
    date : {
        type : Date,
        default : Date.now
    }
});

//ideas=creates our model and connected to idea schema 
mongoose.model("ideas",IdeaSchema)