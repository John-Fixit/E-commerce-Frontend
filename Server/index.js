const express = require('express');
const app = express();
const mongoose = require('mongoose')
require('dotenv').config()
const PORT = process.env.PORT
const URL = process.env.URL
const userRouter = require('./Routes/user.route')
const cors = require('cors')
const bodyParser = require('body-parser');
const { json } = require('express');
app.use(bodyParser.urlencoded({extended:true}))
app.use(json())
app.use(cors())
mongoose.connect(URL, (err)=>{
    if(err){
        console.log(`mongoDB not connected`);
    }
    else{
        console.log(`MongoDB connected`);
    }
})
app.use('/user', userRouter)


app.listen(PORT, ()=>{
    console.log(`Server is listen on port ${PORT}`);
})