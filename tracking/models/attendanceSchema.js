const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const attendanceSchema = Schema(
    {
        tagUId : {
            type : String,
            required : true
        }, 
        studentRollNumber : {
            type : String,
            required : true
        },
        studentName : {
            type : String,
            require: true
        }
    },    
    {
        timestamps:true
    }
);

const Attendance = mongoose.model('Attendance', attendanceSchema);
module.exports =  Attendance;
