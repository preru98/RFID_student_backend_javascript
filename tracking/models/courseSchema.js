const mongoose = require ('mongoose');
const Schema = mongoose.Schema;
const semester = require('./semesterSchema').schema;


const courseSchema = Schema(
    {
        name : {
            type : String,
            required : true
        }, 
        semesters : {
            type:[semester], 
            required : true
        }
    }
);

const Course = mongoose.model('Course', courseSchema);
module.exports = Course;
