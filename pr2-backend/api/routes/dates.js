const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Date = require('../models/Date');

router.post('/', (req, res, next) => {
  const date = new Date({
    _id: new mongoose.Types.ObjectId(),
    day: req.body.day,
    month: req.body.month,
    year: req.body.year,
    bookedByGroup: req.body.bookedByGroup
  });
  date
    .save()
    .then(result => {
      console.log(result);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
  res.status(201).json({
    message: 'Handling POST requests to /dates',
    createdMessage: date
  });
});

router.get('/', (req, res, next) => {
  Date.find()
    .exec()
    .then(doc => {
      console.log('From Database:', doc);
      if (doc) {
        res.status(200).json(doc);
      } else {
        res.status(404).json({
          message: 'No valid entry found'
        });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({error: err});
    });
});

router.get('/:dateId', (req, res, next) => {
  const id = req.params.dateId;
  Date.findById(id)
    .exec()
    .then(doc => {
      console.log('From Database:', doc);
      if (doc) {
        res.status(200).json(doc);
      } else {
        res.status(404).json({
          message: 'No valid entry found'
        });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({error: err});
    });
});


module.exports = router;
