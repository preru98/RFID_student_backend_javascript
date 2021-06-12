const express = require('express');
const bodyParser = require('body-parser');

const Tag = require('../models/tagSchema');

tagRouter = express.Router();

tagRouter.use(bodyParser.json());

tagRouter.route('/')

.get((req, res, next) => {
    Tag.find({})
    .then( ( tags ) =>{
        res.statusCode=200;
        res.setHeader('Content-Type', 'application/json');
        console.log(tags);
        res.json(tags);
    }, (err) => {
        next(err);
    })
    .catch( (err) => {
        next(err);
    })
})

tagRouter.route('/:tagUId')

.get((req,res,next) => {
    Tag.findById(req.params.tagUId)
    .then( (tag) => {
        if(tag){
            res.statusCode=200;
            res.setHeader('Content-Type', 'application/json');
            res.json(tag);
        }
        else{   
            err = new Error("Tag with Id " + req.params.tagUId + " not found");
            err.statusCode = 404;
            err.message = err.message;
            next(err); 
        }
    }, (err) => {
        console.log(err);
        next(err);
    })
    .catch( (err) =>{
        next(err);
    })
});

module.exports = tagRouter;
