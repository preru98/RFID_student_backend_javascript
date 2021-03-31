const mongoose = require ('mongoose');
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
            type : Number,
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

        //course : courseSchema,

    },

    {
        timestamps:true
    }
);

const Students = mongoose.model('Student', studentSchema);
module.exports = Students;