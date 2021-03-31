const express = require('express');
const bodyParser = require('body-parser');

const Course = require('../models/courseSchema');

courseRouter = express.Router();

courseRouter.use(bodyParser.json());

courseRouter.route('/')

.get((req, res, next) => {
    Course.find({})
    .then( ( courses ) =>{
        res.statusCode=200;
        res.setHeader('Content-Type', 'application/json');
        console.log(courses);
        res.json(courses);
    }, (err) => {
        next(err);
    })
    .catch( (err) => {
        next(err);
    })
})

.post((req, res, next) => {
    Course.create(req.body)
    .then( (course) =>{
        console.log("Course obj Created ", course);
        res.statusCode=200;
        res.setHeader('Content-Type', 'application/json');
        res.json(course);
    }, (err) => {
        console.log(err);
        next(err);
    })
    .catch( (err) => {
        console.log(err);
        next(err);
    })
});

module.exports = courseRouter;
