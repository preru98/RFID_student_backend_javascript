const mongoose = require ('mongoose');
const Schema = mongoose.Schema;


const courseSchema = Schema(
    {
        name : {
            type : String,
            required : true
        }
    }
);

const Course = mongoose.model('Course', courseSchema);
module.exports = Course;
