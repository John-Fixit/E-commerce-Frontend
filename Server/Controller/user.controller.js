
const { userModel } = require("../Model/user.model")
const jwt = require('jsonwebtoken')
const SECRET = process.env.JWT_SECRET
const nodemailer = require('nodemailer')
const getLandingPage = (req, res) => {
    res.send(`Welcome to e-commerce site`)
}


const signup = (req, res) => {
    const userDetails = req.body
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'adeoyejohn293@gmail.com',
            pass: '@gufaith996.com'
        }
    })
    const mailMessage = {
        from: 'adeoyejohn293@gmail.com',
        to: `${userDetails.email}`,
        subject: 'Welcome !',
        text: 'Welcome to our site'
    }
    userModel.findOne({ email: userDetails.email }, (err, user) => {
        if (err) {
            console.log(`error dey`);
        } else {
            if (user) {
                res.send({ message: `user already exist`, status: false })
            }
            else {
                const form = new userModel(userDetails)
                form.save((err) => {
                    if (err) {
                        res.status(501).send({ message: `error occur not registered`, status: false })
                    } else {
                        transporter.sendMail(mailMessage, (err, info) => {
                            if (err) {
                                console.log(err);
                            }
                            else {
                                console.log(info.response);
                                res.status(200).send({ message: `Registration successfull`, status: true, })
                            }
                        })
                    }
                })
            }
        }
    })
}
const signin = (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    userModel.findOne({ email: email }, (err, user) => {
        if (err) {
            console.log(`internal error`);
        }
        else {
            if (!user) {
                console.log(`no account of this details is with us`);
                res.send({ message: `No account of this details is with us`, status: false })
            }
            else {
                user.validatePassword(password, (err, same) => {
                    if (err) {
                        console.log(`issue occur`);
                    }
                    else {
                        if (same) {
                            const token = jwt.sign({ email }, SECRET, { expiresIn: '6h' })
                            res.send({ message: 'authenticated successfull', status: true, token })
                        }
                        else {
                            res.send({ message: 'incorrect password', status: false })
                        }
                    }
                })
            }
        }
    })
}
const home = (req, res) => {
    const token = req.headers.authorization.split(' ')[1]
    jwt.verify(token, SECRET, (err, result) => {
        if (err) {
            res.send({ message: `user is unathorized`, status: false })
        } else {
            userModel.findOne({ email: result.email }, (err, userDetails) => {
                if (err) {
                    res.send({ message: `Network error, please check your connection`, status: false })
                }
                else {
                    res.send({ message: `user authorized`, status: true, userDetails })
                }
            })
        }
    })
}
const cartProduct=(req, res)=>{
    const productImage = req.body.productImage
    const productTitle = req.body.title
    const productPrice = req.body.price
    const productVariation = req.body.productVariation
    const userId = req.body.userId
    userModel.findOneAndUpdate({'_id': userId}, {$push: {'cartProduct': {productImage, productPrice, productTitle, productVariation}}}, (err, updatedVersion)=>{
        if(err){
            res.send({message: `Internal server error`, status:false})
            console.log(`err dey for here`);
        }
        else{
            console.log();
            res.send({message: `Product added to your cart`, status: true})
        }
    })
}
const removeCartItem=(req, res)=>{
    const userId = req.body.userId;
    const productImage = req.body.productImage
    userModel.findOne({'_id': userId}, (err, thisUser)=>{
        if(err){
            console.log(`there's error`);
        }
        else{
            let products = thisUser.cartProduct.filter((product)=>(
                product.productImage != productImage
            ))  
            userModel.findOneAndUpdate({'_id': userId}, {'cartProduct': products}), (err, result)=>{
                if(err){
                    console.log('error');
                }
                // else{
                //     console.log(result);
                //     res.send({result, status: true})
                // }
            }
        }
    })
}

module.exports = { getLandingPage, signup, signin, home, cartProduct, removeCartItem}