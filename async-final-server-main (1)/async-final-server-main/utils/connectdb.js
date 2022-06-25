const mongoose = require('mongoose');

const connect = mongoose.connect(process.env.MONGO_DB_CONNECTION_STRING);

//Connecting to mongoDB.
connect.then((r) => {
    console.log("Connected to db.")
}).catch( err => {
    console.log(err);
})