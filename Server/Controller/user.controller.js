
const { userModel } = require("../Model/user.model")
const jwt = require('jsonwebtoken')
const SECRET = process.env.JWT_SECRET
const getLandingPage=(req, res)=>{
    res.send(`Welcome to e-commerce site`)
}
const signup=(req, res)=>{
    const userDetails = req.body
    userModel.findOne({email: userDetails.email}, (err, user)=>{
        if(err){
            console.log(`error dey`);
        }else{
            if(user){
                res.send({message: `user already exist`, status: false})
            }
            else{
                const form = new userModel(userDetails)
                form.save((err)=>{
                    if(err){
                        res.status(501).send({message: `error occur not registered`, status: false})
                    }else{
                        res.status(200).send({message: `Registration successfull`, status: true})
                    }
                })
            }
        }
    })
}
const signin=(req, res)=>{
    const email = req.body.email;
    const password = req.body.password;
    userModel.findOne({email: email}, (err, user)=>{
        if(err){
            console.log(`internal error`);
        }
        else{
            if(!user){
                console.log(`no account of this details is with us`);
                res.send({message: `No account of this details is with us`, status: false})
            }
            else{
               user.validatePassword(password, (err, same)=>{
                if(err){
                    console.log(`issue occur`);
                }    
                else{
                    if(same){
                        const token = jwt.sign({email}, SECRET, {expiresIn: '6h'})
                        res.send({message: 'authenticated successfull', status: true, token})
                    }
                    else{
                        res.send({message: 'incorrect password', status: false})
                    }
                }   
               })
            }
        }
    })
}
const home=(req, res)=>{
    const token = req.headers.authorization.split(' ')[1]
    jwt.verify(token, SECRET, (err, result) =>{
        if(err){
            res.send({message: `user is unathorized`, status: false})
        }else{
            userModel.findOne({email: result.email}, (err, userDetails)=>{
                if(err){
                    res.send({message: `Network error, please check your connection`, status: false})
                }
                else{
                    res.send({message: `user authorized`, status: true, userDetails})
                }
            })
        }
    })
}
module.exports = {getLandingPage, signup, signin, home}