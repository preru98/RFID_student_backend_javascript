const express = require('express');
const bodyParser = require('body-parser');

const Students = require('../models/student');
const Course = require('../models/courseSchema');
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


// .put(verify, (req, res, next) => {
//     Posts.findByIdAndUpdate(req.params.postId, { $set: req.body }, {new :true })
//     .then( (post) =>{
//         if(post){
//             res.statusCode=200;
//             res.setHeader('Content-Type', 'application/json'),
//             res.json(post)
//         }
//         else{   
//             err = new Error("Post with Id " + req.params.postId + " not found");
//             err.statusCode=404;
//             return next(err); 
//         }
//     }, (err) => {
//         next(err);
//     })
//     .catch( (err) =>{
//         next(err);
//     })
// })

// .delete(verify, (req, res, next) => {
//     Posts.findByIdAndRemove(req.params.postId)
//     .then( ( post ) =>{
//         console.log(post)
//         res.statusCode=200
//         res.setHeader('Content-Type', 'application/json')
//         res.json(post)
//     }, (err) => {
//         next(err)
//     })
//     .catch( (err) => {
//         next(err)
//     })
// })


module.exports = studentRouter;
