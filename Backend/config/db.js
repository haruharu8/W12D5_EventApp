// connect mongoose to db
// later when we use mongoose somewhere else, it will be connected

const mongoose = require('mongoose');

let connectionString = `mongodb+srv://God:${process.env.MONGO_PASS}@cluster0.exyeecp.mongodb.net/Company?retryWrites=true&w=majority`


mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// log when connected

mongoose.connection.once('open', ()=> {
    console.log('connected to mongo');
  });