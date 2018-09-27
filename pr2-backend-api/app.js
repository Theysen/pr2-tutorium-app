// Core dependancies
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');

// Authorization dependancies
const jwt = require('jsonwebtoken');

// Config file (env)
const config = require('./configuration/config');

// Mongoose models
const User = require('./models/User');
const Message = require('./models/Message');
const Date = require('./models/Date');
const Index = require('./models/SlotIndex');

// Init express app
const app = express();

// Connect to MongoDB
mongoose.connect(config.database,
  {useNewUrlParser: true})
  .then(console.log('Successfully connected to the database.'));

// Middleware setup
// Cross- origin configuration
app.use(cors());

// BodyParser setup
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Routes
// Messages - get all messages
app.get('/messages', (req, res) => {
  Message
    .find()
    .exec()
    .then(result => {
      if (result) {
        res.status(200).json(result);
      } else {
        res.status(404).json({message: "Entries unavailable"});
      }
    })
    .catch(err => {
      res.status(500).json({error: err});
    })
});

// Messages - post new message
app.post('/messages', (req, res) => {
  const message = new Message({
    _id: new mongoose.Types.ObjectId(),
    title: req.body.title,
    author: req.body.author,
    content: req.body.content
  });
  message
    .save()
    .then(
      res.status(201).json({
        createdMessage: message
      })
    )
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });

});

app.post('/dates', (req, res) => {

  const date = new Date({
    date: req.body.date,
    possibleSlots: req.body.possibleSlots,
    startTime: req.body.startTime,
  });
  date.save()
    .then(
      res.status(200).json({
        createdDate: date
      })
    )
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

// Dates - book slot by date
app.put('/dates', (req, res) => {

  const slot = ({
    bookedByGroup: req.body.bookedByGroup,
    startTime: req.body.startTime,
    message: req.body.message,
    roomNumber: req.body.roomNumber,
    verifyId: req.body.verifyId
  });

  Date.findOneAndUpdate({'date': req.body.date}, {$push: {'slots': slot}}, {new: true}, (err, slots) => {
    if (err) {
      res.status(404).json({
        message: 'Date not found',
        error: err
      });
    } else {
      Index.findOneAndUpdate({_id: "5ba9154b36fb930b5409f1dd"}, {$inc: {index: 1}}, {new: true}, (err, index) => {
      });
      res.status(200).json({
        message: 'Successfully booked',
        slot: slot
      });
    }
  });
});

// Dates - get all dates
app.get('/dates', (req, res) => {
  Date.find()
    .exec()
    .then(result => {
      if (result) {
        res.status(200).json(result);
      } else {
        res.status(404).json({
          message: 'No valid entry found'
        });
      }
    })
    .catch(err => {
      res.status(500).json({error: err});
    });
});

// Slot index - get
app.get('/slots', (req, res) => {

  Index.find()
    .exec()
    .then(result => {
      if (result) {
        res.status(200).json(result);
      } else {
        res.status(404).json({
          message: 'No valid entry found'
        });
      }
    })
    .catch(err => {
      res.status(500).json({error: err});
    });
});

// Register new user
app.post('/register', (req, res) => {

  // Hash password from request body
  let salt = bcrypt.genSaltSync(10);
  let hash = bcrypt.hashSync(req.body.password, salt);

  // Check if user already exists
  User.findOne({'username': req.body.username}, (err, user) => {
    if (err) {
      res.json(err);
    } else {
      if (user) {
        res.json({message: 'User already exists'});
      } else {
        // Create new user in database
        const newUser = new User({
          username: req.body.username,
          password: hash
        }).save()
          .then(result => {
            res.json({
              message: 'User successfully created',
              username: req.body.username
            });
          })
          .catch(err => {
            res.json(err);
          });
      }
    }
  });
});

// Login - Authorization and Token acquisition
app.post('/login', (req, res) => {

  // Check if user exists
  User.findOne({'username': req.body.username}, (err, user) => {
    if (err) {
      res.json(err);
    } else {
      if (!user) {
        res.json({message: 'User does not exist'});
      } else {
        // Compare passwords and create token if match is found
        if (bcrypt.compareSync(req.body.password, user.password)) {
          jwt.sign({user}, config.secret, {expiresIn: '6000s'}, (err, token) => {
            res.json({
              user: req.body.username,
              token: token
            });
          });
        } else {
          res.json({message: 'Passwords do not match'});
        }
      }
    }
  })
});


// Test protected route -> get slot overview
app.get('/bookedslots', verifyToken, (req, res) => {

  Date.find({slots: {$not: {$size: 0}}})
    .then(result => {
      res.json(result);
    })
    .catch(err => {
      res.json(err);
    });
});


function verifyToken(req, res, next) {
  // Get auth header value
  const bearerHeader = req.headers['authorization'];
  // Check if bearer is undefined
  if (typeof bearerHeader !== 'undefined') {
    // Split at the space
    const bearer = bearerHeader.split(' ');
    // Get token from array
    const bearerToken = bearer[1];
    // Set the token
    req.token = bearerToken;
    // Next middleware
    next();
  } else {
    // Forbidden
    res.sendStatus(403);
  }
}


// Start ServerApp
const port = process.env.PORT || config.port;

app.listen(port, () => {
  console.log('Server listening and running on port ' + config.port);
});



