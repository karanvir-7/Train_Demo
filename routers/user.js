const express = require('express');
const router = new express.Router();
const Train  = require('../models/TrainSchema');
const User = require('../models/userSchema');


/* Train Route for showing all the trains for Booking */

router.get('/',(req,res)=>{

    Train.find().exec().then(doc =>{
      res.status(200).send(doc);
    }).catch(err => res.status(400).send(err));
});


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


/* Search Route for one keyword which result in showing 
Train Routes when user search for PNR Number,Source and Destination */

router.get('/search',(req,res)=>{
  Train.find({$or:[{pnr: req.body.keyword},
    {source: req.body.keyword},{destination:req.body.keyword}]}).exec()
    .then(result=>{
    res.status(200).send(result);
  }).catch(err=>{
    res.status(204).send(err);
  })
});

module.exports = router;