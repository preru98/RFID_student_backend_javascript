const mongoose = require ('mongoose');
const subject = require('./subjectSchema');
const Schema = mongoose.Schema;


const semesterSchema = Schema(
    {
        name : {
            type : number,
            required : true
        }, 
        subjects : {
            type:[subject], 
            required : true
        }
    }
);

const Semester = mongoose.model('Semester', semesterSchema);
module.exports = Semester;
