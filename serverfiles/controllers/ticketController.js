const asyncHandler = require('express-async-handler')

const User = require('../models/userModel')
const Ticket = require('../models/ticketModel')

//get user tickets
const getTickets = asyncHandler(async(req, res) => {
    //get user details from jwt
    const user = await User.findById(req.user.id)

    if(!user){
        res.status(401)
        throw new Error('User not found')
    }

    const tickets = await Ticket.find({user: req.user.id})

    res.status(200).json(tickets)
})

const getTicket = asyncHandler(async(req, res) => {
    //get user details from jwt
    const user = await User.findById(req.user.id)

    if(!user){
        res.status(401)
        throw new Error('User not found')
    }

    const ticket = await Ticket.findById(req.params.id)

    if(!ticket){
        res.status(404)
        throw new Error('Ticket not found')
    }

    if(ticket.user.toString() !== req.user.id){
        res.status(401)
        throw new Error()
    }

    res.status(200).json(ticket)
})

const createTicket = asyncHandler(async(req, res) => {
    const {product, description} = req.body

    if(!product || !description){
        res.status(400)
        throw new Error('please add a product and description')
    } 
    //get the user
    const user = await User.findById(req.user.id)

    if(!user){
        res.status(401)
        throw new Error('User not found')
    }

    const ticket = await Ticket.create({
        product, 
        description,
        user: req.user.id,
        status: 'new'
    })

    res.status(201).json(ticket)
})

//delete ticket
const deleteTicket = asyncHandler(async(req, res) => {
    //get user details from jwt
    const user = await User.findById(req.user.id)

    if(!user){
        res.status(401)
        throw new Error('User not found')
    }

    const ticket = await Ticket.findById(req.params.id)

    if(!ticket){
        res.status(404)
        throw new Error('Ticket not found')
    }

    if(ticket.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('Not authorised')
    }
    

    //.reomve is depreciated use this instead, findByIdAndDelete
    await Ticket.findByIdAndDelete(req.params.id)
    res.status(200).json({success:true})
})

const updateTicket = asyncHandler(async(req, res) => {
    //get user details from jwt
    const user = await User.findById(req.user.id)

    if(!user){
        res.status(401)
        throw new Error('User not found')
    }

    const ticket = await Ticket.findById(req.params.id)

    if(!ticket){
        res.status(404)
        throw new Error('Ticket not found')
    }

    if(ticket.user.toString() !== req.user.id){
        res.status(401)
        throw new Error()
    }

    const updatedTicket = await Ticket.findByIdAndUpdate(req.params.id, req.body, {new: true})

    res.status(200).json(updatedTicket)
})

module.exports = {
    getTickets, 
    getTicket, 
    createTicket,
    updateTicket,
    deleteTicket,
}