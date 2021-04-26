const mongoose = require ('mongoose');
const course = require('./courseSchema').schema;
const Schema = mongoose.Schema;

const studentSchema = Schema(
    {
        name : {
            type : String, 
            required : true,
        },

        rollNumber : {
            type : String, 
            required : true,
        },

        email : {
            type : String,
            required : true
        },

        contact : {
            type : String,
            required : true
        },
        
        address : {
            type : String,
            required : true
        },

        password : {
            type : String,
            required : true  
        },

        // tagUId : {
        //     type : String,
        //     required : false
        // },

        //attendance : [ tapTimingSchema ],

        courseAllocated : {
            type : course, 
            require :false
        }

    },

    {
        timestamps:true
    }
);

const Students = mongoose.model('Student', studentSchema);
module.exports = Students;