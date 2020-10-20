const mongoose = require('mongoose');

//Train Schema
const train = new mongoose.Schema({
        pnr:{ 
            type:String ,
            unique:true
        } ,
        price:{
            type:Number,
            required:true,
            min:0
        },
        name: {
            type:String,
            required:true
        },
        class:{
            type:String,
            required:true
        },
        distance: {
            type:String,
            required:true,
        },
        travel_time:{
            type:String,
            required:true
        } ,
        reach_time:{
            type:String,
            required:true
        },
        start_time:{
            type:String,
            required:true
        },
        source:{
            type:String,
            required:true
        },
        destination:{
            type:String,
            required:true
        }
  });
  

  module.exports =  mongoose.model('Train',train);