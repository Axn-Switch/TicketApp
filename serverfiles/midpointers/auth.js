const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const Ticket = require('../models/ticketModel')

const protect = asyncHandler( async (req, res, next) => {
    let token 

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try{
            token = req.headers.authorization.split(' ')[1]
            const decode = jwt.verify(token, process.env.JWT_SECRET)
            req.user = await User.findById(decode.id).select('-password')
            next()
        }catch(err){
            console.log(err)
            res.status(401)
            throw new Error('not authorised')
        }
    }

    if(!token){
        res.status(401)
        throw new Error('not authorised')
    }
})

module.exports = {protect}