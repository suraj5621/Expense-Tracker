const express = require("express");
const app = express();
const path = require('path');
require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');


const expenseRoutes = require('./routes/expenseRoutes');
const authRoutes = require('./routes/authRoutes');




// const dbURL = process.env.dbURL 
const dbURL = process.env.dbURL;
mongoose.connect(dbURL)
.then(()=>{
    console.log("mongodb connected successfully");
})
.catch((err)=>{
    console.log(err);
})



app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(express.json()); //json data




app.use('/api/auth',authRoutes);
app.use('/api/expenses',expenseRoutes);

app.listen(8080 , ()=>{
    console.log("SERVER IS CONNECTED ON PORT 8080");
})