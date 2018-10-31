const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// create schema
const UserSchema = new Schema({
    name:{
        type: String,
        required : true
    },
    email :{
        type : String,
        required : true
    }, 
    password :{
        type : String,
        required : true
    },
    //  confirmpassword :{
    //     type : String,
    //     required : true
    // },
    date : {
        type : Date,
        default : Date.now
    }
})

//ideas=creates our model and connected to idea schema 
mongoose.model("users",UserSchema)