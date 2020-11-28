const express = require('express');
const bodyParser = require('body-parser');

const Tests = require('../models/student');

testRouter = express.Router();

testRouter.use(bodyParser.json());

testRouter.route('/')

.get((req, res, next) => {
    Tests.find({})
    .then( ( tests ) =>{
        res.statusCode=200;
        res.setHeader('Content-Type', 'application/json');
        console.log(tests);
        res.json(tests);
    }, (err) => {
        next(err);
    })
    .catch( (err) => {
        next(err);
    })
})

.post((req, res, next) => {
    Tests.create(req.body)
    .then( (test) =>{
        console.log("Test Created ", test);
        res.statusCode=200;
        res.setHeader('Content-Type', 'application/json');
        res.json(test);
    }, (err) => {
        console.log(err);
        next(err);
    })
    .catch( (err) => {
        console.log(err);
        next(err);
    })
})

module.exports = testRouter;
