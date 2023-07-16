const express = require('express')
const router = express.Router()
const {createTicket,getTicket,getTickets, deleteTicket, updateTicket} = require('../controllers/ticketController')

const {protect} = require('../midpointers/auth')
const noteRouter = require('./noteRoutes')
router.use('/:ticketId/notes', noteRouter)

router.route('/').get(protect, getTickets).post(protect, createTicket)
router.route('/:id').get(protect, getTicket).put(protect, updateTicket).delete(protect,deleteTicket)
module.exports = router
