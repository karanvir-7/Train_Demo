const express = require('express');
const router = new express.Router();
//const Train  = require('../models/TrainSchema');
const User = require('../models/userSchema');


/* Book Route when user send desired data it will save 
data in DB and book the tickets for user */

router.post('/bookTickets',(req,res)=>{
     
   const user = new User({
        firstName: req.body.fName,
        lastName: req.body.lName,
        gender: req.body.gender,
        age: req.body.age,
        email: req.body.email,
        mobile: req.body.mobile,
        pnr: req.body.pnr,
        train_name: req.body.tranName,
        people_travelling: req.body.peopleTravelling,
        class: req.body.class,
        from: req.body.from,
        to : req.body.to,
        amount: req.body.amount
      });

    user.save().then(result => {
        res.status(201).send("Successfully Booked Ticket")
      }).catch(e =>{
        res.status(400).send(e)
      });  
});




module.exports = router;