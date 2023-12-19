const express = require("express");
/* import {PORT,mongoDBURL} from "./config.js" */
const mongoose = require("mongoose");
const connectDB = require("./config/database");
const cors = require('cors');

const app = express();

//Use .env file in config folder
require("dotenv").config({ path: "./config/.env" });
// Middleware for parsing request body
app.use(express.json());

connectDB().then(()=>{
    app.listen(process.env.PORT || PORT, () => {
        console.log(`Server is running on port ${process.env.PORT}`)
    });
})