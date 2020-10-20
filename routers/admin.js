const express = require('express');
const router = new express.Router();
const Admin  = require('../models/adminSchema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//Add new admin only existing admin can add new admin
router.post('/addNewAdmin', async(req, res)=> {
   try{
     
   const admin1 =  await Admin.findOne({adminId : req.body.adminId});
    if(!admin1){
    throw new Error('Please authenticate');   
    } 
    const isMatch = await bcrypt.compare(req.body.password,admin1.password);

    if(!isMatch){
    throw new Error('Password is not Correct');
     }
    const admin = new Admin({
      adminId: req.body.adminId ,
      password: req.body.password,
    });
    admin.password = await bcrypt.hash(admin.password,8);


    await admin.save();
    res.status(201).send('New Admin Added');
  }
  catch(e){
    res.status(400).send(e)
  }
  
});

module.exports = router;

