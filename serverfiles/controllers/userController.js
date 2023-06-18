const asyncHandler = require('express-async-handler')
const bcrpyt = require('bcryptjs')
const User = require('../models/userModel')
const jwt = require('jsonwebtoken')


// register a new user
// this is a public access file
const registerUser = asyncHandler(async(req, res) => {
  
    //validation
    const {name, email, password} = req.body
    if(!name || !email || !password){
        res.status(400)
        throw new Error('Please include all fields')
    }

    //check if user exists
    const userExists = await User.findOne({email})

    if(userExists){
        res.status(400)
        throw new Error("User already exists")
    }


    const salt = await bcrpyt.genSalt(10)
    const hashedPassword = await bcrpyt.hash(password, salt)

    //create the user
    const user = await User.create({
        name, 
        email, 
        password: hashedPassword
    })

    if(user){
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    }else{
        res.status(400)
        throw new error('Invalid user credentials')
    }
})


//this is to login a user
// this also public
const loginUser = asyncHandler(async(req, res) => {
    const {email, password} = req.body
    const user = await User.findOne({email})

    //check user and password match
    if(user && (await bcrpyt.compare(password, user.password))){
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    }
    else{
        res.status(401)
        throw new Error('Invalid Credentials')
    }
    
})

//get current users credentials and must be private access
const getMe = asyncHandler(async (req, res) => {
    const user = {
        id: req.user._id,
        email: req.user.email,
        name: req.user.name
    }
    res.status(200).json(user)
})

const generateToken = (id) =>{
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })
}

module.exports = {
    registerUser, 
    loginUser,
    getMe,
}