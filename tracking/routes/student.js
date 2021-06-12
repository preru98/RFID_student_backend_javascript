const express = require('express');
const bodyParser = require('body-parser');
const Students = require('../models/student');
const Course = require('../models/courseSchema');
const Tag = require('../models/tagSchema');
studentRouter = express.Router();

studentRouter.use(bodyParser.json());

studentRouter.route('/')

.get((req, res, next) => {
    Students.find({})
    .then( ( students ) =>{
        res.statusCode=200;
        res.setHeader('Content-Type', 'application/json');
        console.log(students);
        res.json(students);
    }, (err) => {
        next(err);
    })
    .catch( (err) => {
        next(err);
    })
})

.post((req, res, next) => {
    Students.create(req.body)
    .then( (student) =>{
        console.log("Student obj Created ", student);
        res.statusCode=200;
        res.setHeader('Content-Type', 'application/json');
        res.json(student);
    }, (err) => {
        console.log(err);
        next(err);
    })
    .catch( (err) => {
        console.log(err);
        next(err);
    })
})

studentRouter.route('/:studentId')

.get((req,res,next) => {
    Students.findById(req.params.studentId)
    .then( (student) => {
        if(student){
            res.statusCode=200;
            res.setHeader('Content-Type', 'application/json');
            res.json(student);
        }
        else{   
            console.log("wrong id");
            err = new Error("Student with Id " + req.params.studentId + " not found");
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

studentRouter.route('/:studentId/allocation/:courseId')

.put((req, res, next) => {
    Students.findById(req.params.studentId)
    .then( ( student) => {
        if(student){
            Course.findById(req.params.courseId)
            .then ((course) => {
                if(course){
                    student.courseAllocated = course;
                
                    student.save()
                    .then( (student) => {
                        res.statusCode=200;
                        res.setHeader('Content-Type', 'application/json');
                        res.json(student);
                    })
                    .catch( (err) => {
                        next(err);
                    })
                }
                if(course==null){
                    err = new Error("course with ID : " +req.params.courseId + " not found")
                    err.statusCode = 404;
                    err.message = err.message;
                    next(err); 
                }
            }, 
            (err) => {
                next(err)
            })
        }
        else if(student==null){
            err = new Error("Student with ID : " +req.params.studentId + " not found")
            err.statusCode = 404;
            err.message = err.message;
            next(err); 
        }
        else{
            err = new Error("course with ID : " +req.params.courseId + " not found")
            err.status=404
            return next(err);
        }
    
    }, (err) => {
            next(err);
    })
    .catch( (err) => {
        next(err)
    })
})


studentRouter.route('/:studentId/map')

.put((req, res, next) => {
    
    Students.findById(req.params.studentId)
    .then( (student) => {
        if(student){
            Tag.create(req.body)
            .then( (tag) => {
                console.log("Tag object created", tag);
                student.tagUId = tag.tagUId;
                student.save()
                .then( (student) => {
                    console.log("Student mapping successful");
                    res.statusCode=200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json({student: student, tag:tag});
                }, (err) => {
                    console.log("Something went wrong while updating student", err);
                    err = new Error("Error mapping " + "Aborting mapping procedure");
                    err.statusCode = 423;
                    next(err);
                })
                .catch( (err) => {
                    console.log("Something went wrong while updating student", err);
                    err = new Error("Error mapping " + "Aborting mapping procedure");
                    err.statusCode = 423;
                    next(err);
                })
            }, (err) => {
                console.log("Error creating tag object", err);
                err = new Error("Error creating tag object" + req.body + "Aborting mapping procedure");
                err.statusCode = 423;
                next(err);
            })
            .catch( (err) => {
                console.log("Error creating tag object", err);
                err = new Error("Error creating tag object" + req.body + "Aborting mapping procedure");
                err.statusCode = 423;
                next(err);
            })
        }
        else{   
            console.log("Student Id does not exist");
            err = new Error("Student with Id " + req.params.studentId + " not found. Aborting mapping procedure");
            err.statusCode = 423;
            next(err); 
        }
    }, (err) => {
        console.log("Error finding student. Aborting Mapping procedure", err); 
        err = new Error("Error finding student." + req.params.studentId +" Aborting Mapping procedure");
        err.statusCode = 404;
        next(err);
    })
    .catch( (err) =>{
        console.log("Error finding student. Aborting Mapping procedure", err); 
        err = new Error("Error finding student." + req.params.studentId +" Aborting Mapping procedure");
        err.statusCode = 404;
        next(err);
    });
})

module.exports = studentRouter;
