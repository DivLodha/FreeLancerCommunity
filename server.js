const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-Parser');
const passport = require('passport');
const path = require('path');

const app = express();

//support parsing of application/json type post data
app.use(bodyParser.json());
//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));

//routes config
const users = require('./routes/api/users');
const profile = require('./routes/api/profile');

//DB Config
const db = require('./config/keys').mongoURI;

//connect to DB
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log('Database connected'))
  .catch(err => console.log(err));

//passport middleware
app.use(passport.initialize());

//passport Config
require('./config/passport')(passport);

//use routes
app.use('/api/users', users);
app.use('/api/profile', profile);

//Server static assets if in production
if (process.env.NODE_ENV === 'production') {
  //Set static folder
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
