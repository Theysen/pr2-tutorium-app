const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('./api/models/User');

const messageRoutes = require('./api/routes/messages');
const dateRoutes = require('./api/routes/dates');


mongoose.connect('mongodb+srv://admin_theysen:root@pr2-messages-53qtq.mongodb.net/test?retryWrites=true',
  {useNewUrlParser: true}
);

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }
  next();
});

app.use('/messages', verifyToken, messageRoutes);
app.use('/dates', dateRoutes);


app.post('/register', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  User.findOne({username: username}).exec().then(doc => {
    if (doc != null && doc.username == username) res.json({message: "User already exists"});
  }).catch(err => {
    console.log(err);
    res.status(500).json({
      error: err
    });
  });

  let salt = bcrypt.genSaltSync(10);
  let hash = bcrypt.hashSync(password, salt);

  const newUser = new User({
    username: username,
    password: hash
  }).save()
    .then(result => {
        res.json({
          message: "User created",
          username: username
        })
      }
    )
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

app.post('/login', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  User.findOne({username: username}, (err, user) => {
    hashedPassword = user.password;
    if (bcrypt.compareSync(password, hashedPassword)) {

      jwt.sign({user}, 'secretKey', {expiresIn: '3600s'}, (err, token) => {
        res.json({
          token
        });
      });
    } else {
      res.json({
        message: "Incorrect credentials"
      });
    }
  })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
  ;
});

app.post('/posts', verifyToken, (req, res) => {
  console.log("here")
  jwt.verify(req.token, 'secretKey', (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      res.json({
        message: 'Post created...',
        authData
      });
    }
  });
});


app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

function verifyToken(req, res, next) {
  const bearerHeader = req.headers['authorization'];
  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  } else {
    res.sendStatus(403);
  }
}

module.exports = app;
