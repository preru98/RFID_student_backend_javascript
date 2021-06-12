const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const attendanceSchema = Schema(
    {
        tagUId : {
            type : String,
            required : true
        }
    },    
    {
        timestamps:true
    }
);

const Attendance = mongoose.model('Attendance', attendanceSchema);
module.exports =  Attendance;
