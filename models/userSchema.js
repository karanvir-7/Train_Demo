var mongoose = require('mongoose');
var schema = mongoose.Schema;
var userData =  new schema ({
   firstName:{
       type:String,
       required:true
    },
   lastName:{
       type:String,
   },
   gender:{
       type:String,
   },
   age:{
       type:Number,
       min:0
   },
   email:{ 
       type : String,
       unique:true,
       required:true
    } ,
   mobile:{ 
       type:Number ,
       unique:true
    },
   pnr:{
       type:String,
   },
   train_name:{
       type:String,
   },
   people_travelling:{
       type:Number,
       required:true
   } ,
   class:{
       type:String
   } ,
   from: {
       type:String
   },
   to :{
       type:String
   },
   amount:{
       type:Number,
       required:true,
       min:0
   }
});

module.exports = mongoose.model('User', userData);