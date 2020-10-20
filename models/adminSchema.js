const mongoose = require('mongoose');

//Train Schema
const admin = new mongoose.Schema({
        adminId:{ 
            type:String,
            required:true,
            unique:true
        },
        password:{
            type:String,
            required:true,
        }
  });

  module.exports =  mongoose.model('Admin',admin);