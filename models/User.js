const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const UserSchema = new Schema({


    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    profession: {
        type: String
    },
    bio: {
        type: String
    },
    address: {
        type: String
    },
    degree: {
        type: String
    },
    course: {
        type: String
    },
    phone: {
        type: String
    },
    altemail: {
        type: String
    },
    behaviour: {
        type: String
    },
    teamwork: {
        type: String
    },
    time: {
        type: String
    },
    communication: {
        type: String
    },
    file: {
        type: String
    },
    desc:{
        type: String
    }

});


module.exports=mongoose.model('users', UserSchema);