const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Message = require('../models/Message');

router.post('/', (req, res, next) => {
  const message = new Message({
    _id: new mongoose.Types.ObjectId(),
    title: req.body.title,
    author: req.body.author,
    body: req.body.body
  });
  message
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
    message: 'Handling POST requests to /messages',
    createdMessage: message
  });
});

router.get('/:messageId', (req, res, next) => {
  const id = req.params.messageId;
  Message.findById(id)
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

router.get('/', (req, res, next) => {
  Message.find()
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

router.delete('/:messageId', (req, res, next) => {
  Message.findOneAndDelete(req.params.messageId, function(err) {
    if (err)
      res.send(err);
    else
      res.json({ message: 'Offer Deleted!'});
  });
});

module.exports = router;
