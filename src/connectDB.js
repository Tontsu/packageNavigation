require('dotenv').config({path: '../.env'});
const mongoose = require('mongoose');

const uri = process.env.MONGODB_URI;

const connect = async() => {
  try {
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }, () =>(
      console.log("connected")
    ));
  }
  catch (e) {
    console.log(e);
  }
};

module.exports = connect;
