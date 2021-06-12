const express = require('express');
const bodyParser = require('body-parser');

const Attendance = require('../models/attendanceSchema');
const Student = require('../models/student');

attendanceRouter = express.Router();

attendanceRouter.use(bodyParser.json());

attendanceRouter.route('/')

.get((req, res, next) => {
    Attendance.find({})
    .then( ( all_attendance ) =>{
        res.statusCode=200;
        res.setHeader('Content-Type', 'application/json');
        console.log(all_attendance);
        res.json(all_attendance);
    }, (err) => {
        next(err);
    })
    .catch( (err) => {
        next(err);
    })
})

attendanceRouter.route('/mark')
.post((req, res, next) => {
    Attendance.create(req.body)
    .then( (tapTiming) =>{
        console.log("attendance object created ", tapTiming);
        res.statusCode=200;
        res.setHeader('Content-Type', 'application/json');
        res.json(tapTiming);
    }, (err) => {
        console.log(err);
        next(err);
    })
    .catch( (err) => {
        console.log(err);
        next(err);
    })
})

// tagRouter.route('/:tagUId')

// .get((req,res,next) => {
//     Tag.findById(req.params.tagUId)
//     .then( (tag) => {
//         if(tag){
//             res.statusCode=200;
//             res.setHeader('Content-Type', 'application/json');
//             res.json(tag);
//         }
//         else{   
//             err = new Error("Tag with Id " + req.params.tagUId + " not found");
//             err.statusCode = 404;
//             err.message = err.message;
//             next(err); 
//         }
//     }, (err) => {
//         console.log(err);
//         next(err);
//     })
//     .catch( (err) =>{
//         next(err);
//     })
// });

module.exports = attendanceRouter;
