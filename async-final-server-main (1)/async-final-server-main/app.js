require('dotenv').config();
// require all necessary libraries.
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const cors = require('cors');

const userRoute = require('./routes/userRoutes');

// connect to mongoDB.
require('./utils/connectdb');
// get strategies for.
require('./strategies/LocalStrategy');

//initialize express.
const app = express();

// body parser configuration.
app.use(bodyParser.urlencoded( {extended: true} ));
app.use(bodyParser.json());

//adding the client URL to CORS policy.
const corsOptions = {
    origin: "http://localhost:3000",
    credentials: true
}

// configure the session.
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
}));

// adding CORS policy to express.
app.use(cors(corsOptions));
// initialize passport js and add to express.
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/users", userRoute);


// start the server at port 3001.
const server = app.listen(3001, () => {
    const port = server.address().port;
    console.log("Server started at port: "+ port);
});
