const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const adminSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    email: String,
    contact: String,
    gender: String,
    profilePhoto: String,
    password: String,
    privateKey: String
})

const saltRound = 10;
let roundNum = Math.floor(Math.random()*1000000)
adminSchema.pre('save', function(next){
    bcrypt.hash(this.password, saltRound, (err, hashedPassword)=>{
        if(err){
            console.log(`there is an error in the conversion`);
        }else{
            this.password = hashedPassword
            this.privateKey = roundNum
            // console.log(this.privateKey);
            next()
        }
    })
})
adminSchema.methods.validatePassword = function (password, callback){
    bcrypt.compare(password, this.password, (err, result)=>{
        if(!err){
            callback(err, result)
        }else{
            next()
        }
    })
}
const adminModel = mongoose.model('admin_tb', adminSchema)
module.exports = {adminModel}