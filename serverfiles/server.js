const express = require('express')
const dotenv = require('dotenv').config()
const {errorHandler} = require('./midpointers/errorpointer')
const PORT = process.env.PORT || 8000
const app = express()


app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.get('/', (req, res) =>{
    res.json({message : "welcome"})
})

//Routes
app.use('/api/users', require('./routes/userRoutes'))

app.use(errorHandler)

app.listen(PORT, () => console.log(`Server started on port ${PORT}`) )