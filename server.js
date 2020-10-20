var express = require('express');
var app = express();
const connectDB = require('./db/dbConnect'); 
const Port = process.env.Port || 3000;
var bodyParser = require('body-parser')
const userRouter = require('./routers/user');
const trainRouter = require('./routers/train');
const adminRouter = require('./routers/admin')

//Middleware to parse JSON that is coming in request 
app.use(bodyParser.json());

//database connection
connectDB();

// Routes for user/train/admin
app.use(userRouter);
app.use(trainRouter);
app.use(adminRouter);


app.listen(Port, ()=> {
  console.log(`app listening on port ${Port}`);
});