const path = require('path')
const express = require('express')
const dotenv = require('dotenv').config()
const {errorHandler} = require('./midpointers/errorpointer')
const PORT = process.env.PORT || 8000
const connectToDb = require('./config/dbconfig')
const app = express()

connectToDb()

app.use(express.json())
app.use(express.urlencoded({extended: false}))

//Routes
app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/tickets', require('./routes/ticketRoutes'))


//serve frontend
    app.use(express.static(path.join(__dirname, '../supportdeskapp/build')))
    app.get('/', (req, res) => res.sendFile(__dirname, '../', 'supportdeskapp', 'build', 'index.html'))


app.use(errorHandler)

app.listen(PORT, () => console.log(`Server started on port ${PORT}`) )