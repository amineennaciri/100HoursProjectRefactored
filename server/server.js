const express = require("express");
const mongoose = require("mongoose");
const connectDB = require("./config/database");
const cors = require('cors');
const passport = require('passport');
const session = require("express-session");
const mainRoutes = require('./routes/main');
const dashboardRoutes = require('./routes/dashboard');

const app = express();

//Use .env file in config folder
require("dotenv").config({ path: "./config/.env" });
// express session middleware
app.use(session({ secret: "cats", resave: false, saveUninitialized: false }));
require('./config/passport')(passport);
// passport initialization & session
app.use(passport.initialize());
app.use(passport.session());
// Middleware for parsing request body
app.use(express.json());

// Middleware for handling CORS policy
// Option 1: Allow all Origins with Default of cors(*);
app.use(cors());
// Option 2: Allow custom Origins;
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
  }));
/* app.use(cors({
    origins:'http:localhost:3000',
    methods:['GET','POST','PUT','DELETE'],
    allowedHeaders:['Content-Type'],
})); */

app.use("/", mainRoutes);
app.use("/dashboard", dashboardRoutes);


connectDB().then(()=>{
    app.listen(process.env.PORT || PORT, () => {
        console.log(`Server is running on port ${process.env.PORT}`)
    });
})