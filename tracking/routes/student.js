const express = require('express');
const bodyParser = require('body-parser');

const Students = require('../models/student');

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

module.exports = studentRouter;
