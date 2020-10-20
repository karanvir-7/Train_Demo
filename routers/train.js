const express = require('express');
const router = new express.Router();
const Train  = require('../models/TrainSchema');
const Admin = require('../models/adminSchema');
const bcrypt = require('bcrypt');


/* Train Route for showing all the trains for Booking */

router.get('/',(req,res)=>{

  Train.find().exec().then(doc =>{
    res.status(200).send(doc);
  }).catch(err => res.status(400).send(err));
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

/*ADD Route in which Admin can add new Train Routes */ 
router.post('/adminTrainAdd', async function (req, res) {
  try{
   var authentication =  await authCredentials(req.body);
   if(authentication){
     const train = new Train({
      pnr: req.body.pnr,
      price: req.body.price,
      name: req.body.name,
      class: req.body.class,
      distance: req.body.distance + ' km',
      travel_time: req.body.travelTime + ' hr',
      start_time: req.body.startTime,
      reach_time: req.body.reachTime  ,
      source: req.body.source, 
      destination: req.body.destination
    });
    await train.save();
    res.status(201).send('New Train Added')
  }
  else{
    res.status(400).send('invalid Credentials')
    //throw new Error('Invalid Credentials')
  }
    }
  catch(e){
      res.status(400).send(e);
    } 
  
});

/*DELETE Route in which Admin can delete Train Routes */   
router.delete('/admindeleteTrain', async(req,res)=>{
    try{
      let pnrNo = req.body.pnr; 
      var authentication =  await authCredentials(req.body);
   
      if(authentication){
      await Train.findOneAndDelete({ pnr: pnrNo });
      res.status(200).send('Successfully Deleted');
      }
     else{
      res.status(400).send('Invalid Credentials');
     }
    }
    catch(e){
      res.status(400).send(e);
    } 
 
  
});

//Function to check credentials for admin access to add/delete the train Logs 
const authCredentials = async function(user){
  try{
    const admin =  await Admin.findOne({adminId : user.adminId});
     if(!admin){
      return false;
     } 
  
    const isMatch = await bcrypt.compare(user.password,admin.password);
  
    if(!isMatch){
      return false;
     }
     return true;
  }
  catch(e){
   return false;
  }
}

module.exports = router;