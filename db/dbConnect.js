const mongoose  = require('mongoose');

const URL = 'mongodb+srv://dbUser:dbUser@cluster0.rrv2i.mongodb.net/test?retryWrites=true&w=majority'
const connectDB = ()=>{
        mongoose.connect(URL,{ useNewUrlParser: true,useUnifiedTopology: true,useCreateIndex: true,}).catch(err=>{
                res.send('Database not Connected '+ err);
        });
       // console.log('Database Connected.....')
}

module.exports = connectDB;