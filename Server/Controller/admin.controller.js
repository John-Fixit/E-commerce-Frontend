const { adminModel, productModel } = require("../Model/admin.model")
const jwt = require('jsonwebtoken')
const { userModel } = require("../Model/user.model")
const cloudinary = require('cloudinary')
require('dotenv').config()
const SECRET = process.env.JWT_SECRET

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

const signup = (req, res) => {
    const adminDetail = req.body
    const email = adminDetail.email
    adminModel.findOne({ 'email': email }, (err, foundUser) => {
        if (err) {
            res.status(500).send({ message: `Internal server error`, status: false })
            console.log(`Internal server error`);
        } else {
            if (foundUser) {
                res.send({ message: `This user already exist`, status: false })
                console.log(`user akready exist`);
            } else {
                const form = new adminModel(adminDetail)
                form.save((err) => {
                    if (err) {
                        res.send({ message: `Network error user not yet registered`, status: false })
                    }
                    else {
                        res.send({ message: `Registration successfull`, status: true })
                    }
                })
            }
        }
    })
}
const signin = (req, res) => {
    const password = req.body.password
    const email = req.body.email
    const privateKey = req.body.privateKey
    adminModel.findOne({ 'email': email }, (err, thisUser) => {
        if (err) {
            console.log(`Internal server error!`);
            res.send({messsage: `Network error! please check your connection`, status: false})
        } else {
            if (!thisUser) {
                res.send({ message: `No account of this details with us !!!`, status: false })
            }
            else {
                thisUser.validatePassword(password, (err, result) => {
                    if (err) {
                        res.send({ message: `Internal server error, please check your connection`, status: false })
                    } else {
                        if (result) {
                            if (thisUser.privateKey == privateKey) {
                                const admintoken = jwt.sign({ email }, SECRET, { expiresIn: '2h' })
                                res.send({ message: `user authenticated`, status: true, admintoken })
                            }
                            if (thisUser.privateKey != privateKey) {
                                res.send({ message: `Your private key is not correct!!!`, status: false })
                            }
                        }
                        else {
                            res.send({ message: `The password entered is incorrect !!!`, status: false })
                        }
                    }
                })
            }
        }
    })
}
const authorizeUser = (req, res) => {
    const token = req.headers.authorization.split(' ')[1]
    jwt.verify(token, SECRET, (err, result) => {
        if (err) {
            res.send({ message: `user unathorized`, status: false })
        }
        else {
            adminModel.findOne({ 'email': result.email }, (err, thisadmin) => {
                if (err) {
                    res.send({ message: `Internal server error, please try again`, status: false })
                } else {
                    res.send({ message: `user authorized`, status: true, thisadmin })
                }
            })
        }
    })
}
const customer = (req, res) => {
    userModel.find((err, customers) => {
        if (err) {
            res.send({ message: `Internal server error`, status: false })
        } else {
            adminModel.find((err, admins) => {
                if (err) {
                    res.send({ message: `Internal server error`, status: false })
                }
                else {
                    productModel.find((err, products) => {
                        if (err) {
                            res.send({ message: `Internal server error`, status: false })
                        }
                        else {
                            res.send({ customers, admins, products, status: true })
                        }
                    })
                }
            })
        }
    })
}

const deleteCustomer = (req, res) => {
    const customerId = req.body.customerId
    userModel.findOneAndDelete({ '_id': customerId }, (err, otherCustomers) => {
        if (err) {
            res.send({ message: `Internal server error, customer could'nt deleted`, status: false })
        }
        else {
            res.send({ message: `User has been deleted successfully`, status: true })
        }
    })
}
const deleteStaff = (req, res) => {
    const staffId = req.body.staffId
    adminModel.findOneAndDelete({ '_id': staffId }, (err, otherStaff) => {
        if (err) {
            res.send({ message: `Internal server error, customer could'nt deleted`, status: false })
        }
        else {
            res.send({ message: `User has been deleted successfully`, status: true })
        }
    })
}


const products = (req, res) => {
    const title = req.body.title
    const rating = req.body.rate
    const price = req.body.price
    const productImage = req.body.convertedFile

    cloudinary.v2.uploader.upload(productImage, (err, result) => {
        if (err) {
            res.send({ message: `Network problem, unable to upload` })
        } else {
            const image = result.secure_url
            const productDetail = { image, title, rating, price }
            const form = new productModel(productDetail)
            form.save((err) => {
                if (err) {
                    res.send({ message: `Internal server error`, status: false })
                }
                else {
                    res.send({ message: `Product uploaded successfully`, status: true, })
                }
            })
        }
    })
}
const saveProfile = (req, res) => {
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const email = req.body.email;
    const username = req.body.username;
    const adminId = req.body.adminId;
    const contact = req.body.contact;
    adminModel.findOneAndUpdate({ '_id': adminId }, { $set: { 'firstname': firstname, 'lastname': lastname, 'email': email, 'username': username, 'contact': contact } }, (err, result) => {
        if (err) {
            res.send({ message: `Internal server error`, status: false })
        } else {
            res.send({ message: `Profile Edited successfully`, status: true })
        }
    })
}
const profilePhoto = (req, res) => {
    const myFile = req.body.convertedFile
    const adminId = req.body.adminId
    cloudinary.v2.uploader.upload(myFile, (err, uploadedFile) => {
        if (err) {
            res.send({ message: `Internal server error, image could'nt uploaded!`, status: false })
        } else {
            const profilePhoto = uploadedFile.secure_url
            adminModel.findOneAndUpdate({ '_id': adminId }, { 'profilePhoto': profilePhoto }, (err, result) => {
                if (err) {
                    res.send({ message: `Internal server error`, status: false })
                } else {
                    res.send({ message: `Profile photo uploaded successfully`, status: true })
                }
            })
        }
    })
}
const deleteProduct=(req, res)=>{
    const productId = req.body.productId
    productModel.findOneAndDelete({'_id': productId}, (err, result)=>{
        if(err){
            res.send({message: `Network error! unable to delete Product`, status: false})
        }else{
            res.send({message: `Product deleted successfully`, status: true})
        }
    })
}
module.exports = { signup, signin, authorizeUser, customer, products, deleteCustomer, deleteStaff, saveProfile, profilePhoto, deleteProduct }