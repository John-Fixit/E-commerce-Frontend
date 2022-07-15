const { adminModel } = require("../Model/admin.model")
const jwt = require('jsonwebtoken')
require('dotenv').config()
const SECRET = process.env.JWT_SECRET

const signup=(req, res)=>{
    const adminDetail = req.body
    const email = adminDetail.email
    adminModel.findOne({'email': email}, (err, foundUser)=>{
        if(err){
            res.status(500).send({message: `Internal server error`, status: false})
            console.log(`Internal server error`);
        }else{
            if(foundUser){
                res.send({message: `This user already exist`, status: false})
                console.log(`user akready exist`);
            }else{
                const form = new adminModel(adminDetail)
                form.save((err)=>{
                    if(err){
                        res.send({message: `Network error user not yet registered`, status: false})
                    }
                    else{
                        res.send({message: `Registration successfull`, status: true})
                    }
                })
            }
        }   
    })
}
const signin=(req, res)=>{
    const password = req.body.password
    const email = req.body.email
    const privateKey = req.body.privateKey
    adminModel.findOne({'email': email}, (err, thisUser)=>{
        if(err){
            console.log(`Internal server error!`);
        }else{
            if(!thisUser){
                res.send({message: `No account of this details with us !!!`, status: false})
            }
            else{
                thisUser.validatePassword(password, (err, result)=>{
                    if(err){
                        res.send({message: `Internal server error`, status: false})
                    }else{
                        if(result){
                            if(thisUser.privateKey==privateKey){
                                const admintoken = jwt.sign({email}, SECRET, {expiresIn: '30m'})
                                res.send({message: `user authenticated`, status: true, admintoken})
                            }
                            if(thisUser.privateKey!=privateKey){
                                res.send({message: `Your private key is not correct!!!`, status: false})
                            }
                        }
                        else{
                                res.send({message: `The password entered is incorrect !!!`, status: false})
                        }
                    }
                })
            }
        }
    })
}
const authorizeUser=(req, res)=>{
    const token = req.headers.authorization.split(' ')[1]
    jwt.verify(token, SECRET, (err, result)=>{
        if(err){
            res.send({message: `user unathorized`, status: false})
            console.log(`unauthorized user`);
        }
        else{
            adminModel.findOne({'email': result.email}, (err, thisadmin)=>{
                if(err){
                    console.log(`Internal server error`);
                    res.send({message: `Internal server error, please try again`, status: false})
                }else{
                    console.log(thisadmin);
                    res.send({message:`user authorized`, status: true, thisadmin})
                }
            })
        }
    })
}   

module.exports = {signup, signin, authorizeUser}