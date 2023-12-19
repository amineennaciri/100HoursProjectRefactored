const express = require("express");
const mongoose = require("mongoose");
const connectDB = require("./config/database");
const cors = require('cors');
const passport = require('passport');
const session = require("express-session");
const mainRoutes = require('./routes/main');

const app = express();

//Use .env file in config folder
require("dotenv").config({ path: "./config/.env" });
// express session middleware
app.use(session({ secret: "cats", resave: false, saveUninitialized: true }));
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
/* app.use(cors({
    origins:'http:localhost:3000',
    methods:['GET','POST','PUT','DELETE'],
    allowedHeaders:['Content-Type'],
})); */

app.use("/", mainRoutes);
app.get('/dashboard',(request,response)=>{
    /* console.log(request); */
    return response.status(234).send('Welcome to MERN Stack Tutorial');
})
app.get('/login',(request,response)=>{
    /* console.log(request); */
    return response.status(234).send('Not welcomed to MERN Stack Tutorial');
})


connectDB().then(()=>{
    app.listen(process.env.PORT || PORT, () => {
        console.log(`Server is running on port ${process.env.PORT}`)
    });
})