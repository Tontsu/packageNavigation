const express = require('express');
const path = require('path');
const connectDB = require('./connectDB');
const mongoose = require('mongoose');

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "build")));

const UserSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

const User = mongoose.model("User", UserSchema);

app.get('/users', async (req, res) => {
  const users = await User.find({});
  try {
    res.send(users);
  }
  catch (err) {
    res.status(500).send(err);
  }
});

app.post('/users', async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    res.send(user);
  }
  catch (err) {
    res.status(500).send(err);
  }
});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, ".." , "build", "index.html"));
});

app.listen(process.env.PORT || 8080, connectDB());
