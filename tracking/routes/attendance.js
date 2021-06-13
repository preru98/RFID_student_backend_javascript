const express = require('express');
const bodyParser = require('body-parser');
const dateFormat = require("dateformat");

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
    Student.findOne({tagUId : req.body.tagUId})
    .then( (student) => {
        if(student){
            const newAttendeeRecord = {
                tagUId : req.body.tagUId,
                studentRollNumber : student.rollNumber,
                studentName : student.name
            }
            Attendance.create(newAttendeeRecord)
            .then( (tapTiming) => {
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
        }else{   
            console.log("Student Id does not exist");
            err = new Error("Student with Id " + req.params.studentId + " not found. Aborting attendance marking procedure");
            err.statusCode = 423;
            next(err); 
        }
    }, (err) => {
        console.log("Error finding student. Aborting attendance marking procedure", err); 
        err = new Error("Error finding student." + req.params.studentId +" not found. Aborting attendance marking procedure");
        err.statusCode = 423;
        next(err);
    })
    .catch( (err) =>{
        console.log("Error finding student. Aborting attendance marking procedure", err); 
        err = new Error("Error finding student." + req.params.studentId +" Aborting attendance marking procedure");
        err.statusCode = 423;
        next(err);
    });
})

attendanceRouter.route('/:studentRollNumber')
//get student attendance with roll number
.get((req,res,next) => {
    Student.find({rollNumber:req.params.studentRollNumber})
    .then( (student) => {
        if(student){
            Attendance.find({studentRollNumber:req.params.studentRollNumber})
            .then( (attendanceRecord) => {
                console.log("attendance record length", attendanceRecord.length );
                for(let i=0;i< attendanceRecord.length; i++ ){
                    attendanceRecord[i] = attendanceRecord[i].toObject();
                    console.log("i", i);
                    console.log("attendance record", i ,  attendanceRecord[i] );
                    attendanceRecord[i].createdAt=dateFormat(attendanceRecord[i].createdAt.toISOString(), "dddd, mmmm dS, yyyy, h:MM:ss TT");
                }
                console.log("attendance record ", attendanceRecord );
                res.statusCode=200;
                res.setHeader('Content-Type', 'application/json');
                res.json(attendanceRecord);
            }, (err) => {
                console.log(err);
                next(err);
            })
            .catch( (err) => {
                console.log(err);
                next(err);
            })
        }
        else{   
            console.log("wrong roll number");
            err = new Error("Student with roll number " + req.params.studentRollNumber + " not found");
            err.statusCode = 404;
            err.message = err.message;
            next(err); 
        }
    }, (err) => {
        console.log(err.message);
        next(err);
    })
    .catch( (err) =>{
        next(err);
    })
})

module.exports = attendanceRouter;
