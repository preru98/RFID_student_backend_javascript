const mongoose = require ('mongoose');
const subject = require('./subjectSchema').schema;
const Schema = mongoose.Schema;


const semesterSchema = Schema(
    {
        name : {
            type : Number,
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
